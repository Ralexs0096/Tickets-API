import { Knex } from 'knex';

const tableName = 'styles';
const createdBy = 'seed file';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const brand = await knex('brands').where('name', 'Brand 1').first();
  const customer = await knex('customers').where('name', 'customer1').first();

  // Inserts styles
  await knex(tableName).insert([
    {
      code: 'F15WR305',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
    {
      code: 'F15WR306',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
    {
      code: 'F15WR307',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
    {
      code: 'F15WR308',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
    {
      code: 'F15WR309',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
    {
      code: 'F15WR310',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
    {
      code: 'F15WR311',
      brandId: brand?.id,
      customerId: customer?.id,
      ModifiedBy: createdBy,
      CreatedBy: createdBy,
    },
  ]);
}
