import { Knex } from 'knex';

export enum AuditColumnName {
  modifiedBy = 'ModifiedBy',
  modifiedDate = 'ModifiedDate',
  createdBy = 'CreatedBy',
  createdDate = 'CreatedDate',
}

/**
 * PostgreSQL uses `varchar` by default, so this function
 * is no longer needed but kept for backward compatibility.
 *
 * note: use this when creating migrations.
 * reference: https://knexjs.org/guide/schema-builder.html#string
 */
export const fixTable = <TableBuilder extends Knex.TableBuilder>(
  table: TableBuilder
): TableBuilder => {
  table.string = (columnName, length = 255) =>
    table.specificType(columnName, `varchar(${length})`);
  return table;
};

class Migration {
  constructor(
    public knex: Knex,
    public tableName: string
  ) {}

  static async createTableIfNotExists(
    knex: Knex,
    tableName: string,
    tableBuilder: (tableBuilder: Knex.CreateTableBuilder) => void
  ): Promise<void> {
    const exists = await knex.schema.hasTable(tableName);
    if (exists) {
      return;
    }
    return knex.schema.createTable(tableName, tableBuilder);
  }

  /**
   * Alters the schema of an existing table to add the following audit columns:
   *   - CreatedDate: the date the record was created
   *   - CreatedBy: username of the person that created the record
   *   - ModifiedDate: the date the record was updated
   *   - ModifiedBy: username of the person that update the record
   */
  async addAuditColumns(): Promise<void> {
    await this.knex.schema.alterTable(this.tableName, (t) => {
      const table = fixTable(t);
      table
        .string(AuditColumnName.modifiedBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.modifiedDate, { precision: 3 })
        .notNullable()
        .defaultTo(this.knex.raw('NOW()'));
      table
        .string(AuditColumnName.createdBy)
        .notNullable()
        .defaultTo('Unknown');
      table
        .dateTime(AuditColumnName.createdDate, { precision: 3 })
        .notNullable()
        .defaultTo(this.knex.raw('NOW()'));
    });
  }
}

export default Migration;
