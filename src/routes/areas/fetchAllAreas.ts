import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import { Area } from '../../types/Area';
import AreaModel from '../../models/area';

type Reply = Area[] | { error: {} };
type FetchAllAreas = {
  Reply: Reply;
};

const url = '/area';

export const handler: RouteHandler<FetchAllAreas> = async (req, reply) => {
  const areas = await AreaModel.query().select('name');
  reply.status(201).send(areas);
};

export const schema = {
  operationId: 'fetchAllAreas',
  tags: ['Area'],
  summary: 'Fetch All Areas',
  response: {
    201: {
      title: 'Area',
      type: 'array',
      required: ['name'],
      additionalProperties: false,
      properties: {
        name: {
          type: 'string'
        }
      }
    }
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
