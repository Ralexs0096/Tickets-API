import 'dotenv/config';
import Knex from 'knex';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const getKnexConfig = (opts: {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
}) => {
  const { host, port, user, password, database } = opts;

  return {
    client: 'mssql',
    connection: {
      host: host ?? DB_HOST,
      port: port ?? Number(DB_PORT),
      user: user ?? DB_USER,
      password: password ?? DB_PASSWORD,
      database: database ?? DB_DATABASE,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  };
};

const knex = Knex(getKnexConfig({}));

export const onDatabaseConnect = async () => knex.raw('SELECT 1');

export default knex;
