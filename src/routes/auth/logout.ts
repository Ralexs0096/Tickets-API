import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';

import ErrorSchema from '../../schemas/ErrorSchema.json';
import { WithError } from '../../utils/typesUtilities';

interface LogoutRoute {
  Reply: WithError<{ success: boolean }>;
}

const url = '/logout';

export const handler: RouteHandler<LogoutRoute> = async (req, reply) => {
  try {
    await req.session.destroy();
    return reply.status(200).send({ success: true });
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to logout.',
      },
    });
  }
};

export const schema = {
  operationId: 'logout',
  tags: ['Auth'],
  summary: 'End user session.',
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
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

const logout: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  LogoutRoute
> = {
  method: 'POST',
  url,
  handler,
  schema,
};

export default logout;
