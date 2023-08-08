import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  /**
   * first at all, we need to check if the table have
   * duplicate records and handle them.
   *
   * given that this table handles the areas, we can delete
   * the duplicated areas and leave only One
   */
  const duplicates = await knex('areas')
    .select('name')
    .groupBy('name')
    .having(knex.raw('COUNT(*) > 1'));

  for (const duplicate of duplicates) {
    const [rowToKeep] = await knex('areas')
      .where('name', duplicate.name)
      .limit(1);

    await knex('areas')
      .where('name', duplicate.name)
      .whereNot('id', rowToKeep.id)
      .del();
  }

  /**
   * at this point we have no duplicate records, so
   * we can apply the UNIQUE constraint to the name column
   */
  await knex.schema.alterTable('areas', (table) => {
    table.unique(['name']);
  });
}

export async function down(knex: Knex): Promise<void> {}
