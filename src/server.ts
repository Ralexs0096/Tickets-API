import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import knex, { onDatabaseConnect } from './config/knex';
import { Model } from 'objection';
import routes, { RoutesToRegister } from './routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { envs } from './config/envs';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import { SessionStore } from './utils/SessionStore';
import { isAuthenticated } from './plugins/auth';

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
    logger: envToLogger[envs.NODE_ENV] ?? true,
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

  server.register(fastifyCookie);
  server.register(fastifySession, {
    secret: envs.MY_SECRET,
    cookieName: 'sessionId',
    store: SessionStore,
  });

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

  server.addHook('preHandler', isAuthenticated);

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

  server.setNotFoundHandler(function custom404(_, reply) {
    reply.send({
      message: 'URL Not Found.',
    });
  });

  process.on('SIGINT', async function closeApplication() {
    /**
     * Adding this signaling handle will prevent the kill of the server,
     * thus allowing the complete execution of the requests and preventing
     * new HTTP requests from being accepted.
     */
    const twoSeconds = 2_000;
    const timeout = setTimeout(function forceClose() {
      server.log.error('force closing server');
      process.exit(1);
    }, twoSeconds);
    timeout.unref();

    try {
      await server.close();
      server.log.info('Bye Bye');
    } catch (error) {
      server.log.error(error, 'The app had trouble turning off');
    }
  });

  return server;
};

onDatabaseConnect()
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Unable to connect to database'));

export default createServer;
