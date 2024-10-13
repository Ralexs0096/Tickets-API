import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import knex, { onDatabaseConnect } from './config/knex';
import { Model } from 'objection';
import routes, { RoutesToRegister } from './routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

// reference: https://fastify.dev/docs/latest/Reference/Logging/
const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

// Global config for the three main instance of fastify
const config = {
  serverOptions: {
    logger: envToLogger['development'] ?? true,
    // TODO: Check if the `listen` method can be relocated here
  },
  pluginOptions: {},
  applicationOptions: {},
};

const createServer = (includedRoutes?: RoutesToRegister) => {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify(config.serverOptions);

  /** Give the knex instance to objection */
  Model.knex(knex);

  /** Configure Swagger */
  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Ticket API Swagger',
        description: 'TICKETS - Fastify swagger API',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost',
    },
  });

  /** Register all routes */
  routes(server, includedRoutes);

  /** Configure swagger UI */
  server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true, // Content Security Policy
    transformStaticCSP: (header) => header,
    transformSpecificationClone: true,
  });

  return server;
};

onDatabaseConnect()
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Something went wrong'));

export default createServer;
