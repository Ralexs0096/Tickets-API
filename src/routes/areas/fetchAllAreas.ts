import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import AreaModel from '../../models/area';

import InternalErrorSchema from '../../schemas/InternalError.json';
import FetchAllAreasReplySchema from '../../schemas/FetchAllAreasReply.json';

import { Area } from '../../types/Area';
import { WithError } from '../../utils/typesUtilities';

interface FetchAllAreas {
  Reply: WithError<Area[]>;
}

const url = '/area';

export const handler: RouteHandler<FetchAllAreas> = async (_, reply) => {
  try {
    const areas = await AreaModel.query();
    return reply.status(201).send(areas);
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to fetch areas.',
      },
    });
  }
};

export const schema = {
  operationId: 'fetchAllAreas',
  tags: ['Area'],
  summary: 'Fetch All Areas',
  response: {
    201: FetchAllAreasReplySchema,
    500: InternalErrorSchema,
  },
};

const fetchAllAreas: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchAllAreas
> = {
  method: 'GET',
  url,
  handler,
  schema,
};

export default fetchAllAreas;
