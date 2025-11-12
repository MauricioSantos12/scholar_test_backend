export async function up(knex) {
  const exists = await knex.schema.hasTable("components");
  if (exists) return;

  await knex.schema.createTable("components", (table) => {
    table.increments("id").primary();
    table
      .integer("area_id")
      .unsigned()
      .references("id")
      .inTable("areas")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description");
    table.string("image_url");
    table.integer("position").notNullable().defaultTo(1);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("components");
}
