import { Knex } from 'knex';

const tableName = 'brands';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts brands
  await knex(tableName).insert([
    { name: 'Brand 1', modifiedBy: createdBy, createdBy },
    { name: 'Brand 2', modifiedBy: createdBy, createdBy },
    { name: 'Brand 3', modifiedBy: createdBy, createdBy },
    { name: 'Brand 4', modifiedBy: createdBy, createdBy },
    { name: 'Brand 5', modifiedBy: createdBy, createdBy },
    { name: 'Brand 6', modifiedBy: createdBy, createdBy },
    { name: 'Brand 7', modifiedBy: createdBy, createdBy },
  ]);
}
