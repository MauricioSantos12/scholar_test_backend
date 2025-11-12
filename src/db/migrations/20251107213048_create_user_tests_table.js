export async function up(knex) {
  const exists = await knex.schema.hasTable("user_tests");
  if (exists) return;

  await knex.schema.createTable("user_tests", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("test_id")
      .unsigned()
      .references("id")
      .inTable("tests")
      .onDelete("CASCADE");
    table.decimal("score", 5, 2).defaultTo(0);
    table.datetime("completed_at");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("user_tests");
}
