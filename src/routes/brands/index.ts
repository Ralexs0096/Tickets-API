import { FastifyPluginCallback, RouteOptions } from "fastify";
import createBrand from "./createBrand";
import updateBrand from "./updateBrand";
import fetchAllBrands from "./fetchAllBrands";

const routesForAuthServer = [
  createBrand,
  updateBrand,
  fetchAllBrands

] as RouteOptions[];

export const authRoutes: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routesForAuthServer) {
    server.route(route);
  }
  next();
};

const routerForPublicServer = [] as RouteOptions[];

export const publicRoute: FastifyPluginCallback = (server, _opts, next) => {
  for (const route of routerForPublicServer) {
    server.route(route);
  }
  next();
};

export default { authRoutes, publicRoute };
