export async function up(knex) {
  const exists = await knex.schema.hasTable("user_component_results");
  if (exists) return;

  await knex.schema.createTable("user_component_results", (table) => {
    table.increments("id").primary();
    table
      .integer("user_area_result_id")
      .unsigned()
      .references("id")
      .inTable("user_area_results")
      .onDelete("CASCADE");
    table
      .integer("component_id")
      .unsigned()
      .references("id")
      .inTable("components")
      .onDelete("CASCADE");
    table.decimal("score", 5, 2).defaultTo(0);
    table.integer("correct_answers").defaultTo(0);
    table.integer("total_questions").defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("user_component_results");
}
