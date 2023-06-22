import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import { Area } from '../../types/Area';

type Reply = Area[] | { error: {} };
type FetchAllAreas = {
  Reply: Reply;
};

const url = '/area';

export const handler: RouteHandler<FetchAllAreas> = async (req, reply) => {
  reply.status(201).send([]);
};

export const schema = {
  operationId: 'fetchAllAreas',
  tags: ['Area'],
  summary: 'Fetch All Areas',
  response: {
    201: {}
  }
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
  schema
};

export default fetchAllAreas;
