import { FastifyPluginCallback, RouteOptions } from 'fastify';
import createArea from './createArea';

/** Imports Routes */

/** Define Public Routes */
const routesForAuthServer = [createArea] as RouteOptions[];

export const authRoutes: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routesForAuthServer) {
    server.route(route);
  }
  next();
};

/** Define Private Routes */
const routerForPublicServer = [] as RouteOptions[];

export const publicRoute: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routerForPublicServer) {
    server.route(route);
  }
  next();
};

export default { authRoutes, publicRoute };
