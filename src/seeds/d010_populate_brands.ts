import { Knex } from 'knex';

const tableName = 'brands';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts brands
  await knex(tableName).insert([
    { name: 'Brand 2', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'Brand 1', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'Brand 3', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'Brand 4', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'Brand 5', ModifiedBy: createdBy, CreatedBy: createdBy },

    { name: 'Brand 6', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'Brand 7', ModifiedBy: createdBy, CreatedBy: createdBy },
  ]);
}
