import { Knex } from 'knex';

const tableName = 'areas';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Delete ALL existing entries
  // TODO: adjust this seeder to verify data before inserting the new one.
  await knex(tableName).del();

  // Insert areas
  await knex(tableName).insert([
    { name: 'corte', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'puño', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'manga', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'ensamble', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'pechera', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'empaque', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'planchado', ModifiedBy: createdBy, CreatedBy: createdBy },
  ]);
}
