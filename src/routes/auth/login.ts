import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import LoginRequestSchema from '../../schemas/Body/LoginRequest.json';
import { LoginRequest as LoginRequestBody } from './../../types/Body/LoginRequest.d';

interface LoginRoute {
  Body: LoginRequestBody;
}

const url = '/area';

export const handler: RouteHandler<LoginRoute> = async (req, reply) => {
  try {
    return reply.status(201).send({});
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
  operationId: 'login',
  tags: ['Auth'],
  body: LoginRequestSchema,
  summary: 'Allow a user to start session.',
  response: {
    201: {},
    500: {},
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
