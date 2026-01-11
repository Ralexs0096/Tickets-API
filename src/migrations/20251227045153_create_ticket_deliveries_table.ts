import { Knex } from 'knex';
import Migration from '../utils/Migrations';

export async function up(knex: Knex): Promise<void> {
  await Migration.createTableIfNotExists(knex, 'ticket_deliveries', (table) => {
    table.increments('id').primary();
    table.integer('ticket_id').unsigned().notNullable();
    table.integer('area_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.timestamp('delivered_at').notNullable();
    table.string('notes').nullable();

    table.foreign('ticket_id').references('id').inTable('tickets');
    table.foreign('area_id').references('id').inTable('areas');
    table.foreign('user_id').references('id').inTable('users');
  });

  const ticketDeliveriesMigration = new Migration(knex, 'ticket_deliveries');
  await ticketDeliveriesMigration.addAuditColumns();
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ticket_deliveries');
}
