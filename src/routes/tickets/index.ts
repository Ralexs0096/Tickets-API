import { FastifyPluginCallback, RouteOptions } from 'fastify';

/** **************** Imports Routes **************** */
import fetchAllTickets from './fetchAllTickets';

/** **************** Define Private Routes **************** */
const routesForAuthServer = [fetchAllTickets] as RouteOptions[];

export const authRoutes: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routesForAuthServer) {
    server.route(route);
  }
  next();
};

/** **************** Define Public Routes **************** */
const routerForPublicServer = [] as RouteOptions[];

export const publicRoute: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routerForPublicServer) {
    server.route(route);
  }
  next();
};

export default { authRoutes, publicRoute };
