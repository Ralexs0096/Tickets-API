import { FastifyInstance, RouteOptions } from 'fastify';
import { isAuthenticated } from './plugins/auth';

import {
  publicRoute as areasPublicRoutes,
  authRoutes as areasPrivateRoutes,
} from './routes/areas';
import {
  publicRoute as ticketsPublicRoutes,
  authRoutes as ticketsPrivateRoutes,
} from './routes/tickets';
import {
  publicRoute as usersPublicRoutes,
  authRoutes as usersPrivateRoutes,
} from './routes/users';
import {
  publicRoute as brandsPublicRoutes,
  authRoutes as brandsPrivateRoutes,
} from './routes/brands';
import {
  authRoutes as privateAuthRoutes,
  publicRoute as publicAuthRoutes,
} from './routes/auth';

export interface RoutesToRegister {
  publicRoute?: RouteOptions[];
  authRoute?: RouteOptions[];
}

function routes(server: FastifyInstance, includedRoutes?: RoutesToRegister) {
  void server.register(async function publicContext(publicServer) {
    if (includedRoutes) {
      /**
       * this change allow us defined which routes will be registered
       * if these routes are not provided, we will register all routes
       */
      await publicServer.register((server, _opts, next) => {
        // TODO: ADD LOGIN ROUTE HERE
        // server.route(login)
        for (const route of includedRoutes.publicRoute ?? []) {
          server.route(route);
        }
        next();
      });
    } else {
      await publicServer.register(publicAuthRoutes);
      await publicServer.register(areasPublicRoutes);
      await publicServer.register(ticketsPublicRoutes);
      await publicServer.register(usersPublicRoutes);
      await publicServer.register(brandsPublicRoutes);
    }
  });

  void server.register(async function privateContext(authRequiredServer) {
    authRequiredServer.addHook('preHandler', isAuthenticated);

    if (includedRoutes) {
      await authRequiredServer.register((server, _opts, next) => {
        for (const route of includedRoutes.authRoute ?? []) {
          server.route(route);
        }
        next();
      });
    } else {
      await authRequiredServer.register(privateAuthRoutes);
      await authRequiredServer.register(areasPrivateRoutes);
      await authRequiredServer.register(ticketsPrivateRoutes);
      await authRequiredServer.register(usersPrivateRoutes);
      await authRequiredServer.register(brandsPrivateRoutes);
    }
  });
}

export default routes;
