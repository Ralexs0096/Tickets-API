import { FastifyReply, FastifyRequest } from 'fastify';
import { SessionData } from '../models/session';

export async function isAuthenticated(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const session = req.session as SessionData | undefined;
  if (session && !session.userId) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
