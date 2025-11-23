import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  NODE_ENV: env
    .get('NODE_ENV')
    .required()
    .asEnum(['development', 'production', 'test']),
  DB_HOST: env.get('DB_HOST').required().asString(),
  DB_PORT: env.get('DB_PORT').required().asPortNumber(),
  DB_USER: env.get('DB_USER').required().asString(),
  DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
  DB_DATABASE: env.get('DB_DATABASE').required().asString(),
  DEBUG: env.get('DEBUG').default('knex:query'),

  PORT: env.get('PORT').asPortNumber(),
  PINO_ENVIRONMENT: env.get('PINO_ENVIRONMENT').default('development'),
  MY_SECRET: env
    .get('MY_SECRET')
    .default('My super mega secret never reveal, never ever')
    .asString(),
  FRONTEND_URL: env.get('FRONTEND_URL').required().asString(),
};
