import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import { Area } from '../../types/Area';
import CreateAreaSchema from '../../schemas/CreateArea.json';
import AreaModel from '../../models/area';
import { CreateArea } from '../../types/CreateArea';

type Reply = Area | { error: {} };
type CreateAreaRoute = {
  Body: CreateArea;
  Reply: Reply;
};

const url = '/area';

export const handler: RouteHandler<CreateAreaRoute> = async (req, reply) => {
  try {
    const newAreas = req.body.areas.map((area) => {
      return {
        // we will register all Areas in Capital Letters
        name: area.name?.toLocaleUpperCase(),

        /** TODO: update these values with requester USER */
        CreatedBy: 'ADMIN_TEST',
        ModifiedBy: 'ADMIN_TEST',
        CreatedDate: new Date(),
        ModifiedDate: new Date()
      };
    });

    await AreaModel.query().insert(newAreas);

    reply.status(200).send();
  } catch (error) {
    return reply.status(500).send({
      error: {
        code: 'unknown',
        message: `An unknown error occurred when trying to create an Area. Error: ${error}`
      }
    });
  }
};

export const schema = {
  operationId: 'createArea',
  tags: ['Area'],
  summary: 'Create a new Area.',
  body: CreateAreaSchema,
  response: {
    200: {
      type: 'null'
    },
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
