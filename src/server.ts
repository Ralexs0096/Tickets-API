import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true
  });

const createServer = () => {
  server.get('/ping', async (request, reply) => {
    return 'Pong\n';
  });
  return server;
};

export default createServer;
