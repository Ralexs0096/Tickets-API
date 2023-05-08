import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { onDatabaseConnect } from './config/knex';

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

onDatabaseConnect()
  .then(() => console.log('Databse is connected'))
  .catch(() => console.log('Something was wrong'));

export default createServer;
