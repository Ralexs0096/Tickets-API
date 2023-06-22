import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import knex, { onDatabaseConnect } from './config/knex';
import { Model } from 'objection';
import routes from './routes';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true
  });

const createServer = () => {
  /** Give the knex instance to objection */
  Model.knex(knex);

  /** Register all routes */
  routes(server);

  return server;
};

onDatabaseConnect()
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Something went wrong'));

export default createServer;
