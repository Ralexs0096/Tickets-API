import { envs } from './src/config/envs';
import CreateServer from './src/server';

const PORT = envs.PORT || 5000;
const fastify = CreateServer();

export const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: +PORT });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
