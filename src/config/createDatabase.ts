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
    const result = await knexConfig.raw(`
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${dbName}')
      BEGIN
        CREATE DATABASE ${dbName};
      END
    `);
    if (result) {
      console.log('Database was created');
    } else {
      console.log('Database was not created');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    knexConfig.destroy();
  }
};

createDB();

export default createDB;
