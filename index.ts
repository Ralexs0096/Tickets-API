import Server from './src/server';

const PORT = process.env.PORT || 5000;
const fastify = Server();

export const start = async () : Promise<void> => {
  try {
    await fastify.listen({ port: +PORT });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
