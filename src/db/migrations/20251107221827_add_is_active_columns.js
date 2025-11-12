export async function up(knex) {
  const tablesToUpdate = [
    "users",
    "tests",
    "areas",
    "components",
    "questions",
    "answers",
  ];

  for (const tableName of tablesToUpdate) {
    const hasColumn = await knex.schema.hasColumn(tableName, "is_active");
    if (!hasColumn) {
      await knex.schema.alterTable(tableName, (table) => {
        table.boolean("is_active").notNullable().defaultTo(true);
      });
    }
  }
}

export async function down(knex) {
  const tablesToUpdate = [
    "users",
    "tests",
    "areas",
    "components",
    "questions",
    "answers",
  ];

  for (const tableName of tablesToUpdate) {
    const hasColumn = await knex.schema.hasColumn(tableName, "is_active");
    if (hasColumn) {
      await knex.schema.alterTable(tableName, (table) => {
        table.dropColumn("is_active");
      });
    }
  }
}
