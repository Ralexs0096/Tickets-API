import { FastifyPluginCallback, RouteOptions } from 'fastify';

/** **************** Imports Routes *****************/
import login from './login';

/** **************** Define Private Routes **************** */
const routesForAuthServer = [] as RouteOptions[];

export const authRoutes: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routesForAuthServer) {
    server.route(route);
  }
  next();
};

/** **************** Define Public Routes **************** */
const routerForPublicServer = [login] as RouteOptions[];

export const publicRoute: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routerForPublicServer) {
    server.route(route);
  }
  next();
};

export default { authRoutes, publicRoute };
