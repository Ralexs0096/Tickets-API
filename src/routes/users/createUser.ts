import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import { User } from '../../types/User';
import UserSchema from '../../schemas/User.json';
import UserModel from '../../models/user';

type CreateUserRoute = {
  Body: User;
};

const url = '/user';

export const handler: RouteHandler<CreateUserRoute> = async (req, reply) => {
  try {
    const { name, last_name, area_id } = req.body;

    const newUser = {
      name,
      last_name,
      area_id,
      /** TODO: update these values with requester USER */
      CreatedBy: 'ADMIN_TEST',
      ModifiedBy: 'ADMIN_TEST',
      CreatedDate: new Date(),
      ModifiedDate: new Date()
    };

    await UserModel.query().insert(newUser);

    return reply.status(200).send();
  } catch (error) {
    return reply.status(500).send({
      error: {
        code: 'unknown',
        message: `An unknown error occurred when trying to create a user. Error: ${error}`
      }
    });
  }
};

export const schema = {
  operationId: 'createUser',
  tags: ['User'],
  summary: 'Create a new User',
  body: UserSchema,
  response: {
    200: {
      type: 'null'
    },
    400: {
      title: 'InvalidUser',
      description: 'Invalid or missing User data.',
      type: 'object',
      required: ['error'],
      properties: {
        error: {}
      }
    }
  }
};

const createUser: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateUserRoute
> = {
  method: 'POST',
  url,
  handler,
  schema
};

export default createUser;
