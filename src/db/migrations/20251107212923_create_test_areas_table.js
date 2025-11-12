export async function up(knex) {
  const exists = await knex.schema.hasTable("test_areas");
  if (exists) return;

  await knex.schema.createTable("test_areas", (table) => {
    table.increments("id").primary();
    table
      .integer("test_id")
      .unsigned()
      .references("id")
      .inTable("tests")
      .onDelete("CASCADE");
    table
      .integer("area_id")
      .unsigned()
      .references("id")
      .inTable("areas")
      .onDelete("CASCADE");
    table.decimal("weight", 5, 2).notNullable().defaultTo(0);
    table.integer("position").defaultTo(1);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("test_areas");
}
