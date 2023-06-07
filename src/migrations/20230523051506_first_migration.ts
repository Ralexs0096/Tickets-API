import { Knex } from 'knex';

export enum AuditColumnName {
  modifiedBy = 'ModifiedBy',
  modifiedDate = 'ModifiedDate',
  createdBy = 'CreatedBy',
  createdDate = 'CreatedDate'
}

export async function up(knex: Knex): Promise<void> {
  // !TODO: VALIDATE .withKeyName and return the "key" instead of _id

  await knex.schema

    /** AREAS TABLE  */
    .createTable('areas', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
    })

    /** BRANDS TABLE  */
    .createTable('brands', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
    })

    /** CUSTOMERS TABLE  */
    .createTable('customers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
    })

    /** CUTS TABLE  */
    .createTable('cuts', (table) => {
      table.increments('id').primary();
      table.integer('code').notNullable();
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
    })

    /** STYLES TABLE  */
    .createTable('styles', (table) => {
      table.increments('id').primary();
      table.string('code').notNullable();
      table.integer('brand_id').references('id').inTable('brands');
      table.integer('customer_id').references('customers.id').notNullable();
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
    })

    /** TICKETS TABLE  */
    .createTable('tickets', (table) => {
      table.increments('id').primary();
      table.integer('cutNumber').notNullable();
      table.integer('style_id').references('id').inTable('styles');
      table.integer('brand_id').references('id').inTable('brands');
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
    })

    /** USERS TABLE  */
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('last_name').notNullable();
      table.integer('area_id').references('id').inTable('areas');
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(knex.raw('SYSUTCDATETIME()'));
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
