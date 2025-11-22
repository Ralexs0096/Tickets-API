import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';

import LoginRequestSchema from '../../schemas/Body/LoginRequest.json';
import LoginReplySchema from '../../schemas/Reply/LoginReply.json';
import ErrorSchema from '../../schemas/ErrorSchema.json';

import { LoginRequest as LoginRequestBody } from './../../types/Body/LoginRequest';
import { LoginReply } from '../../types/Reply/LoginReply';
import { WithError } from '../../utils/typesUtilities';
import { validateUser } from './helpers/validateUser';

interface LoginRoute {
  Body: LoginRequestBody;
  Reply: WithError<LoginReply>;
}

const url = '/login';

export const handler: RouteHandler<LoginRoute> = async (req, reply) => {
  try {
    const { email, password } = req.body;

    const result = await validateUser(req, email, password);

    if (!result.success) return reply.code(401).send(result.error);

    return reply.status(200).send({
      success: true,
      user: {
        id: result.userInfo.id,
        email: result.userInfo.email,
        firstName: result.userInfo.firstName,
        lastName: result.userInfo.lastName,
        areaId: result.userInfo.areaId,
      },
    });
  } catch (error) {
    return reply.status(500).send({
      error: `${error}`,
      code: 'Unknown',
      message: 'An unknown error occurred when trying to fetch areas.',
    });
  }
};

export const schema = {
  operationId: 'login',
  tags: ['Auth'],
  body: LoginRequestSchema,
  summary: 'Allow a user to start session.',
  response: {
    200: LoginReplySchema,
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

const login: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  LoginRoute
> = {
  method: 'POST',
  url,
  handler,
  schema,
};

export default login;
