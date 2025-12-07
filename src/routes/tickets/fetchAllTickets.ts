import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';

import TicketModel from '../../models/ticket';

import NotFoundSchema from '../../schemas/NotFound.json';
import InternalServerErrorSchema from '../../schemas/InternalError.json';
import FetchAllTicketsReplySchema from '../../schemas/Reply/FetchAllTicketsReply.json';
import { WithError } from '../../utils/typesUtilities';
import { FetchAllTicketsReply } from '../../types/Reply/FetchAllTicketsReply';

interface FetchAllTickets {
  Reply: WithError<FetchAllTicketsReply>;
}

const url = '/tickets';

export const handler: RouteHandler<FetchAllTickets> = async (_, reply) => {
  try {
    const result = (await TicketModel.query()
      .joinRelated('[style, brand]')
      .select(
        'tickets.id',
        'tickets.cutNumber',
        'brand.name as brand',
        'style.code as style'
      )) as unknown as FetchAllTicketsReply['tickets'];

    if (result.length === 0) {
      return reply.status(404).send({
        error: {
          error: 'Not Found',
          code: 'NotFound',
          message: 'There are not tickets currently',
        },
      });
    }

    return reply.status(200).send({
      tickets: result,
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
