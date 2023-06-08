import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import AreaSchema from '../../schemas/Area.json';
import { AreaRequestParams } from '../../types/AreaRequestParams';
import AreaRequestParamsSchema from '../../schemas/AreaRequestParams.json';
import { Area } from '../../types/Area';

type Reply = {};
type UpdateAreaRoute = {
  Body: Area;
  Params: AreaRequestParams;
  Reply: Reply;
};

const url = '/area/:id';

const handler: RouteHandler<UpdateAreaRoute> = (req, reply) => {
  console.log(`Area with ID ${req.params.id} will be updated`);
  reply.status(204).send();
};

const schema = {
  operationId: 'updateArea',
  tags: ['Area'],
  summary: 'Update an Area.',
  params: AreaRequestParamsSchema,
  body: AreaSchema,
  response: {
    201: AreaSchema,
    400: {
      title: 'InvalidArea',
      description: 'Invalid or missing Area data.',
      type: 'object',
      required: ['error'],
      properties: {
        error: {}
      }
    }
  }
};

const updateArea: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  UpdateAreaRoute
> = {
  method: 'PUT',
  url,
  handler,
  schema
};

export default updateArea;
