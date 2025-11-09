import { Knex } from 'knex';
import Migration from '../utils/Migrations';

const tableName = 'sessions';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, async (table) => {
    table.string('sid', 255).primary();
    table.text('session').notNullable();
    table.timestamp('expired').notNullable().index();

    const sessionMigration = new Migration(knex, tableName);
    await sessionMigration.addAuditColumns();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
