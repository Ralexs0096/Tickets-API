import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import { User } from '../../types/User';
import UserSchema from '../../schemas/User.json';

type CreateUserRoute = {
  Body: User;
};

const url = '/user';

export const handler: RouteHandler<CreateUserRoute> = async (req, reply) => {
  /**
   * Create User
   */
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
