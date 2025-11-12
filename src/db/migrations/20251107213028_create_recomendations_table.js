export async function up(knex) {
  const exists = await knex.schema.hasTable("recommendations");
  if (exists) return;

  await knex.schema.createTable("recommendations", (table) => {
    table.increments("id").primary();
    table
      .integer("area_id")
      .unsigned()
      .references("id")
      .inTable("areas")
      .onDelete("CASCADE");
    table.decimal("min_score", 5, 2).notNullable();
    table.decimal("max_score", 5, 2).notNullable();
    table.text("text").notNullable();
    table.string("image_url");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("recommendations");
}
