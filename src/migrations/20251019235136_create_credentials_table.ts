import { Knex } from 'knex';
import Migration from '../utils/Migrations';

const tableName = 'credentials';

export async function up(knex: Knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();

    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.string('email').notNullable().unique();
    table.string('passwordHash').notNullable();
    table.boolean('isActive').notNullable().defaultTo(true);

    const credentialsMigration = new Migration(knex, tableName);
    credentialsMigration.addAuditColumns();
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists(tableName);
}
