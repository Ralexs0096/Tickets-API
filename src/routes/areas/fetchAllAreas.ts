import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import AreaModel from '../../models/area';
import ErrorSchemaJson from '../../schemas/ErrorSchema.json';
import { Area } from '../../types/Area';
import { ErrorSchema } from '../../types/ErrorSchema';

type Reply = Area[] | { error: ErrorSchema };
interface FetchAllAreas {
  Reply: Reply;
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
    201: {
      title: 'Area',
      type: 'array',
      required: ['name'],
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  },
  500: {
    title: 'Error',
    description: 'An unknown error occurred when trying to fetch areas.',
    type: 'object',
    require: ['error'],
    properties: {
      error: ErrorSchemaJson,
    },
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
