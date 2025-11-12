export async function up(knex) {
  const exists = await knex.schema.hasTable("area_results");
  if (exists) return;

  await knex.schema.createTable("area_results", (table) => {
    table.increments("id").primary();
    table
      .integer("test_result_id")
      .unsigned()
      .references("id")
      .inTable("test_results")
      .onDelete("CASCADE");
    table
      .integer("area_id")
      .unsigned()
      .references("id")
      .inTable("areas")
      .onDelete("CASCADE");
    table.float("score").notNullable();
    table.integer("correct_answers").defaultTo(0);
    table.integer("incorrect_answers").defaultTo(0);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("area_results");
}
