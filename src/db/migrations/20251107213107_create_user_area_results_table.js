export async function up(knex) {
  const exists = await knex.schema.hasTable("user_area_results");
  if (exists) return;

  await knex.schema.createTable("user_area_results", (table) => {
    table.increments("id").primary();
    table
      .integer("user_test_id")
      .unsigned()
      .references("id")
      .inTable("user_tests")
      .onDelete("CASCADE");
    table
      .integer("area_id")
      .unsigned()
      .references("id")
      .inTable("areas")
      .onDelete("CASCADE");
    table.decimal("score", 5, 2).defaultTo(0);
    table.integer("correct_answers").defaultTo(0);
    table.integer("total_questions").defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("user_area_results");
}
