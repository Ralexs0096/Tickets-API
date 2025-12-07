import { Knex } from 'knex';

const tableName = 'areas';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // TODO: adjust this seeder to verify data before inserting the new one.
  await knex(tableName).del();

  // Inserts areas
  await knex(tableName).insert([
    { name: 'corte', modifiedBy: createdBy, createdBy },
    { name: 'puño', modifiedBy: createdBy, createdBy },
    { name: 'manga', modifiedBy: createdBy, createdBy },
    { name: 'ensamble', modifiedBy: createdBy, createdBy },
    { name: 'pechera', modifiedBy: createdBy, createdBy },
    { name: 'empaque', modifiedBy: createdBy, createdBy },
    { name: 'planchado', modifiedBy: createdBy, createdBy },
  ]);
}
