import { FastifyInstance, RouteOptions } from 'fastify';
import {
  publicRoute as areasPublicRoutes,
  authRoutes as areasPrivateRoutes
} from './routes/areas';
import {
  publicRoute as ticketsPublicRoutes,
  authRoutes as ticketsPrivateRoutes
} from './routes/tickets';
import {
  publicRoute as usersPublicRoutes,
  authRoutes as usersPrivateRoutes
} from './routes/users';

interface RoutesToRegister {
  publicRoute?: RouteOptions[];
  authRoute?: RouteOptions[];
}

function routes(server: FastifyInstance, includedRoutes?: RoutesToRegister) {
  void server.register(async function publicContext(publicServer) {
    if (includedRoutes) {
      /**
       * TODO: add includedRoutes
       *
       * this change allow us defined which routes will be registered
       * if these routes are not provided, we will register all routes
       */
    } else {
      await publicServer.register(areasPublicRoutes);
      await publicServer.register(ticketsPublicRoutes);
      await publicServer.register(usersPublicRoutes);
    }
  });

  void server.register(async function privateContext(authRequiredServer) {
    /**
     * TODO: we need to add an authentication check here - This will be implemented when AUTHENTICATION is ready
     */
    if (includedRoutes) {
      /**
       * TODO: add includedRoutes
       */
    } else {
      await authRequiredServer.register(areasPrivateRoutes);
      await authRequiredServer.register(ticketsPrivateRoutes);
      await authRequiredServer.register(usersPrivateRoutes);
    }
  });
}

export default routes;
