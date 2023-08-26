import { Knex } from 'knex';
import Migration, { fixTable } from '../utils/Migrations';

export async function up(knex: Knex): Promise<void> {
  /** AREAS TABLE  */
  await Migration.createTableIfNotExists(knex, 'areas', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.string('name').notNullable();
  });

  const areasMigration = new Migration(knex, 'areas');
  await areasMigration.addAuditColumns();

  /** BRANDS TABLE  */
  await Migration.createTableIfNotExists(knex, 'brands', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.string('name').notNullable();
  });

  const brandsMigration = new Migration(knex, 'brands');
  await brandsMigration.addAuditColumns();

  /** CUSTOMERS TABLE  */
  await Migration.createTableIfNotExists(knex, 'customers', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.string('name').notNullable();
  });

  const customersMigration = new Migration(knex, 'customers');
  await customersMigration.addAuditColumns();

  /** CUTS TABLE  */
  await Migration.createTableIfNotExists(knex, 'cuts', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.integer('code').notNullable();
  });

  const cutsMigration = new Migration(knex, 'cuts');
  await cutsMigration.addAuditColumns();

  /** STYLES TABLE  */
  await Migration.createTableIfNotExists(knex, 'styles', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.string('code').notNullable();
    table.integer('brandId').references('id').inTable('brands').notNullable();
    table.integer('customerId').references('customers.id').notNullable();
  });

  const stylesMigration = new Migration(knex, 'styles');
  await stylesMigration.addAuditColumns();

  // /** TICKETS TABLE  */
  await Migration.createTableIfNotExists(knex, 'tickets', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.integer('cutNumber').notNullable();
    table.integer('styleId').references('id').inTable('styles');
    table.integer('brandId').references('id').inTable('brands');
  });

  const ticketsMigration = new Migration(knex, 'tickets');
  await ticketsMigration.addAuditColumns();

  /** USERS TABLE  */
  await Migration.createTableIfNotExists(knex, 'users', (table) => {
    table = fixTable(table);

    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.integer('areaId').references('id').inTable('areas');
  });

  const usersMigration = new Migration(knex, 'users');
  await usersMigration.addAuditColumns();
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable('users')
    .dropTable('tickets')
    .dropTable('styles')
    .dropTable('cuts')
    .dropTable('brands')
    .dropTable('customers')
    .dropTable('areas');
}
