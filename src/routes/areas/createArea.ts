import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import AreaSchema from '../../schemas/Area.json';
import { Area } from '../../types/Area';
import AreaModel from '../../models/area';

type Reply = Area | { error: {} };
type CreateAreaRoute = {
  Body: Area;
  Reply: Reply;
};

const url = '/area';

export const handler: RouteHandler<CreateAreaRoute> = async (req, reply) => {
  const createdArea = await AreaModel.query().insert({
    // we will register all Areas in Capital Letters
    name: req.body.name.toUpperCase(),

    /** TODO: update these values with requester USER */
    CreatedBy: 'ADMIN_TEST',
    ModifiedBy: 'ADMIN_TEST',
    CreatedDate: new Date(),
    ModifiedDate: new Date()
  });

  reply.status(201).send({
    name: createdArea.name
  });
};

export const schema = {
  operationId: 'createArea',
  tags: ['Area'],
  summary: 'Create a new Area.',
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

const createArea: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateAreaRoute
> = {
  method: 'POST',
  url,
  handler,
  schema
};

export default createArea;
