import { Knex } from 'knex';
import Migration from '../utils/Migrations';

const tableName = 'roles';
const secondTableName = 'credential_roles';

export async function up(knex: Knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('description');

    const rolesMigration = new Migration(knex, tableName);
    rolesMigration.addAuditColumns();
  });

  await knex.schema.createTable(secondTableName, (table) => {
    table.increments('id').primary();

    table
      .integer('credentialId')
      .unsigned()
      .references('id')
      .inTable('credentials')
      .onDelete('CASCADE');

    table
      .integer('roleId')
      .unsigned()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');

    table.unique(['credentialId', 'roleId']);

    const credentialRoleMigration = new Migration(knex, secondTableName);
    credentialRoleMigration.addAuditColumns();
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists(secondTableName);
  await knex.schema.dropTableIfExists(tableName);
}
