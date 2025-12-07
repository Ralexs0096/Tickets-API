import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';

import NotFoundSchema from '../../schemas/NotFound.json';
import InternalServerErrorSchema from '../../schemas/InternalError.json';
import FetchAllTicketsReplySchema from '../../schemas/Reply/FetchAllTicketsReply.json';
import FetchAllTicketsQueryStringSchema from '../../schemas/QueryStrings/FetchAllTicketsQueryString.json';

import { WithError } from '../../utils/typesUtilities';
import { FetchAllTicketsReply } from '../../types/Reply/FetchAllTicketsReply';
import { FetchAllTicketsQueryString } from './../../types/QueryStrings/FetchAllTicketsQueryString.d';
import { buildTicketBaseQuery } from './helpers/buildTicketBaseQuery';

interface FetchAllTickets {
  Reply: WithError<FetchAllTicketsReply>;
  Querystring: FetchAllTicketsQueryString;
}

const url = '/tickets';

export const handler: RouteHandler<FetchAllTickets> = async (req, reply) => {
  try {
    const { limit = 5, date, ticketNumber } = req.query;

    if (ticketNumber) {
      const requestedTicket = (await buildTicketBaseQuery()
        .where('cutNumber', ticketNumber)
        .first()) as unknown as FetchAllTicketsReply['tickets'][1];

      return reply.status(200).send({
        tickets: requestedTicket ? [requestedTicket] : [],
      });
    }

    const targetDate = date || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const todaysTickets = (await buildTicketBaseQuery()
      .whereRaw('CONVERT(date, tickets.CreatedDate) = ?', [targetDate])
      .orderBy(
        'tickets.CreatedDate',
        'desc'
      )) as unknown as FetchAllTicketsReply['tickets'];

    if (todaysTickets.length > 0) {
      return reply.status(200).send({
        tickets: todaysTickets,
      });
    }

    const lastTickets = (await buildTicketBaseQuery()
      .orderBy('tickets.CreatedDate', 'desc')
      .limit(limit)) as unknown as FetchAllTicketsReply['tickets'];

    if (lastTickets.length === 0) {
      return reply.status(404).send({
        error: {
          error: 'Not Found',
          code: 'NotFound',
          message: 'There are not tickets currently',
        },
      });
    }

    return reply.status(200).send({
      tickets: lastTickets,
    });
  } catch (error) {
    // TODO: implement a log system more robust
    console.log({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to fetch users.',
      },
    });

    return reply.status(500).send({
      error: {
        error: 'Internal Server Error',
        code: 'Unknown',
        message: 'An unknown error occurred when trying to fetch users.',
      },
    });
  }
};

export const schema = {
  operationId: 'fetchAllTickets',
  tags: ['Ticket'],
  summary: 'Fetch All existing tickets',
  querystring: FetchAllTicketsQueryStringSchema,
  response: {
    200: FetchAllTicketsReplySchema,
    404: NotFoundSchema,
    500: InternalServerErrorSchema,
  },
};

const fetchAllTickets: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchAllTickets
> = {
  method: 'GET',
  url,
  handler,
  schema,
};

export default fetchAllTickets;
