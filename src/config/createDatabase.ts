import knex from 'knex';
import { getKnexConfig } from './knex';

const knexConfig = knex({
  ...getKnexConfig({
    database: '',
  }),
});

const dbName = process.env.DB_DATABASE ?? 'TICKETS';

const createDB = async () => {
  try {
    const exists = await knexConfig.raw(
      `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
    );

    if (exists.rows && exists.rows.length === 0) {
      await knexConfig.raw(`CREATE DATABASE ${dbName}`);
      console.log('Database was created');
    } else {
      console.log('Database already exists');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    knexConfig.destroy();
  }
};

createDB();

export default createDB;
