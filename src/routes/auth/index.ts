import { FastifyPluginCallback, RouteOptions } from 'fastify';

/** **************** Imports Routes *****************/
import login from './login';
import logout from './logout';

/** **************** Define Private Routes **************** */
const routesForAuthServer = [] as RouteOptions[];

export const authRoutes: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routesForAuthServer) {
    server.route(route);
  }
  next();
};

/** **************** Define Public Routes **************** */
const routerForPublicServer = [login, logout] as RouteOptions[];

export const publicRoute: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routerForPublicServer) {
    server.route(route);
  }
  next();
};

export default { authRoutes, publicRoute };
