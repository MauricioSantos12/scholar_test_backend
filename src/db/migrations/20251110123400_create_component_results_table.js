export async function up(knex) {
  const exists = await knex.schema.hasTable("component_results");
  if (exists) return;

  await knex.schema.createTable("component_results", (table) => {
    table.increments("id").primary();
    table
      .integer("area_result_id")
      .unsigned()
      .references("id")
      .inTable("area_results")
      .onDelete("CASCADE");
    table
      .integer("component_id")
      .unsigned()
      .references("id")
      .inTable("components")
      .onDelete("CASCADE");
    table.float("score").notNullable();
    table.integer("correct_answers").defaultTo(0);
    table.integer("incorrect_answers").defaultTo(0);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("component_results");
}
