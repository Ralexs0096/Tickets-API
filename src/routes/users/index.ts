import { FastifyPluginCallback, RouteOptions } from 'fastify';

/** ****************** Imports Routes ****************** */
import createUser from './createUser';
import deleteUser from './deleteUser';
import fetchAllUsers from './fetchAllUsers';
import updateUser from './updateUser';
import fetchUser from './fetchUser';

/** ****************** Define Private Routes ****************** */
const routesForAuthServer = [
  createUser,
  deleteUser,
  fetchAllUsers,
  updateUser,
  fetchUser,
] as RouteOptions[];

export const authRoutes: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routesForAuthServer) {
    server.route(route);
  }
  next();
};

/** ****************** Define Public Routes ****************** */
const routerForPublicServer = [] as RouteOptions[];

export const publicRoute: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routerForPublicServer) {
    server.route(route);
  }
  next();
};

export default { authRoutes, publicRoute };
