import { Knex } from 'knex';

const tableName = 'customers';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts customers
  await knex(tableName).insert([
    { name: 'customer1', modifiedBy: createdBy, createdBy },
    { name: 'customer2', modifiedBy: createdBy, createdBy },
    { name: 'customer3', modifiedBy: createdBy, createdBy },
    { name: 'customer4', modifiedBy: createdBy, createdBy },
    { name: 'customer5', modifiedBy: createdBy, createdBy },
    { name: 'customer6', modifiedBy: createdBy, createdBy },
    { name: 'customer7', modifiedBy: createdBy, createdBy },
  ]);
}
