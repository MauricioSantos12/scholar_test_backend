export async function up(knex) {
  const exists = await knex.schema.hasTable("test_results");
  if (exists) return;

  await knex.schema.createTable("test_results", (table) => {
    table.increments("id").primary();
    table
      .integer("test_id")
      .unsigned()
      .references("id")
      .inTable("tests")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.float("score").notNullable(); // porcentaje total
    table.integer("correct_answers").defaultTo(0);
    table.integer("incorrect_answers").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("test_results");
}
