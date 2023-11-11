import knex, { Knex } from 'knex';
import { getKnexConfig } from '../config/knex';

/** For use when queries need a case-insensitive comparison. */
export const CASE_INSENSITIVE_COLLATION = 'Latin1_General_100_CI_AI_SC_UTF8';

/** Just in case someone wants a case-sensitive collation. */
export const CASE_SENSITIVE_COLLATION = 'Latin1_General_100_CS_AI_SC_UTF8';

/** The collation used by all strings in the database by default. */
export const COLLATION = CASE_INSENSITIVE_COLLATION;

export async function destroyDatabase(knex: Knex, name: string): Promise<void> {
  return knex.raw('DROP DATABASE IF EXISTS :name:', { name });
}

export async function createDatabase(knex: Knex, name: string): Promise<void> {
  return knex.raw(`CREATE DATABASE :name: COLLATE ${COLLATION}`, {
    name,
  });
}

export async function hasDatabase(knex: Knex, name: string): Promise<boolean> {
  const [first] = await knex.raw('SELECT DB_ID(?) AS N ', name);
  return first.N !== null;
}

/**
 * We need to recreate the database for testing so,
 * we are going to create a series of functions to help us do this
 */
export const recreateTestDatabase = async (): Promise<void> => {
  const dbName = process.env.DB_DATABASE ?? '(DB_DATABASE WAS NOT SET!)';

  await recreate(dbName);
};

const recreate = async (dbName: string) => {
  const knexConfig = knex({
    ...getKnexConfig({
      database: '',
    }),
  });

  if (await hasDatabase(knexConfig, dbName)) {
    console.log(`database ${dbName} exists, it will be destroyed`);
    await destroyDatabase(knexConfig, dbName);
    console.log(`database ${dbName} has been destroyed`);
  }

  await createDatabase(knexConfig, dbName);
  console.log(`database ${dbName} has been created`);
  await migrateToLatest(dbName);

  await knexConfig.destroy();
};

const migrateToLatest = async (dbName: string) => {
  const knexConfig = knex({
    ...getKnexConfig({
      database: dbName,
    }),
  });
  console.time('migrate test db to latest');
  await knexConfig.migrate.latest();
  console.timeEnd('migrate test db to latest');
  console.log(`database ${dbName} has been migrated to latest`);
  await knexConfig.destroy();
};

export default recreateTestDatabase;
