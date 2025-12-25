import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import UserModel from '../../models/user';

import { WithError } from '../../utils/typesUtilities';
import { User } from '../../types/User';

import NotFoundSchema from '../../schemas/NotFound.json';
import InternalErrorSchema from '../../schemas/InternalError.json';
import UserSchema from '../../schemas/User.json';

interface FetchAllUsers {
  Reply: WithError<User[]>;
}

const url = '/user';

export const handler: RouteHandler<FetchAllUsers> = async (req, reply) => {
  try {
    const users = await UserModel.query();
    if (users.length === 0) {
      return reply.status(404).send({
        error: {
          error: 'Not Found',
          code: 'NotFound',
          message: 'There are not Users currently',
        },
      });
    }

    reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to fetch users.',
      },
    });
  }
};

export const schema = {
  operationId: 'fetchAllUsers',
  tags: ['User'],
  summary: 'Fetch All Users',
  response: {
    200: {
      title: 'FetchAllUsers',
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: UserSchema,
        },
      },
      required: ['tickets'],
      additionalProperties: false,
    },
    404: NotFoundSchema,
    500: InternalErrorSchema,
  },
};

const fetchAllUsers: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchAllUsers
> = {
  method: 'GET',
  url,
  handler,
  schema,
};

export default fetchAllUsers;
