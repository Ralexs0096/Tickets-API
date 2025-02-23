import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  DB_HOST: env.get('DB_HOST').required().asString(),
  DB_PORT: env.get('DB_PORT').required().asPortNumber(),
  DB_USER: env.get('DB_USER').required().asString(),
  DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
  DB_DATABASE: env.get('DB_DATABASE').required().asString(),
  DEBUG: env.get('DEBUG').default('knex:query'),

  PORT: env.get('PORT').required(),
  PINO_ENVIRONMENT: env.get('PINO_ENVIRONMENT').default('development'),
};
