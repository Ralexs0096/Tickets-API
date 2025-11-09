import '@fastify/session';

declare module '@fastify/session' {
  interface FastifySessionObject {
    userId?: number;
    username?: string;
  }
}
