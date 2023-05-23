import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('areas', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('brands', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('customers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('cuts', (table) => {
      table.increments('id').primary();
      table.integer('code').notNullable();
      table.timestamps(true, true);
    })
    .createTable('styles', (table) => {
      table.increments('id').primary();
      table.string('code').notNullable();
      table.integer('brand_id').references('id').inTable('brands');
      table.integer('customer_id').references('customers.id').notNullable();
      table.timestamps(true, true);
    })
    .createTable('tickets', (table) => {
      table.increments('id').primary();
      table.integer('cutNumber').notNullable();
      table.integer('style_id').references('id').inTable('styles');
      table.integer('brand_id').references('id').inTable('brands');
      table.timestamps(true, true);
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('last_name').notNullable();
      table.integer('area_id').references('id').inTable('areas');
      table.timestamps(true, true);
    });
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
