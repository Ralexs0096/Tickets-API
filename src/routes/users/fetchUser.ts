import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';

import User from '../../models/user';
import { WithError } from '../../utils/typesUtilities';

import ErrorSchema from '../../schemas/ErrorSchema.json';
import FetchUserReplySchema from '../../schemas/FetchUserReply.json';
import FetchUserParamsSchema from '../../schemas/FetchUserParams.json';

import { FetchUserParams } from '../../types/FetchUserParams';
import { FetchUserReply } from './../../types/FetchUserReply.d';

interface FetchUserRoute {
  Params: FetchUserParams;
  Reply: WithError<FetchUserReply>;
}

const url = '/u/:userId';

export const handler: RouteHandler<FetchUserRoute> = async (req, reply) => {
  try {
    const userId =
      req.params.userId === 'me' ? req.session.userId : req.params.userId;

    const user = await User.query().findById(userId);

    if (!user) {
      return reply.status(404).send({
        error: {
          error: 'Not Found',
          code: 'NotFound',
          message: 'User not found.',
        },
      });
    }

    return reply.status(200).send({
      user: {
        id: user.id,
        email: req.session.username,
        firstName: user.firstName,
        lastName: user.lastName,
        areaId: user.areaId,
      },
    });
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
  operationId: 'fetchUser',
  tags: ['User'],
  params: FetchUserParamsSchema,
  summary: 'Returns a user by ID or the user currently logged in.',
  response: {
    200: FetchUserReplySchema,
    404: {
      title: 'Not Found',
      description: 'User not found.',
      type: 'object',
      required: ['error'],
      properties: {
        error: ErrorSchema,
      },
    },
    500: {
      title: 'Internal Server Error',
      description: 'An unknown error occurred.',
      type: 'object',
      required: ['error'],
      properties: {
        error: ErrorSchema,
      },
    },
  },
};

const fetchUser: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchUserRoute
> = {
  method: 'GET',
  url,
  handler,
  schema,
};

export default fetchUser;
