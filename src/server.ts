import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import knex, { onDatabaseConnect } from './config/knex';
import { Model } from 'objection';
import routes, { RoutesToRegister } from './routes';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  });

const createServer = (includedRoutes?: RoutesToRegister) => {
  /** Give the knex instance to objection */
  Model.knex(knex);

  /** Register all routes */
  routes(server, includedRoutes);

  return server;
};

onDatabaseConnect()
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Something went wrong'));

export default createServer;
