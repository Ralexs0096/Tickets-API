import { Knex } from 'knex';

const tableName = 'customers';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts customers
  await knex(tableName).insert([
    { name: 'customer1', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'customer2', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'customer3', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'customer4', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'customer5', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'customer6', ModifiedBy: createdBy, CreatedBy: createdBy },
    { name: 'customer7', ModifiedBy: createdBy, CreatedBy: createdBy },
  ]);
}
