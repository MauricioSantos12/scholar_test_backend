export async function up(knex) {
  const exists = await knex.schema.hasTable("questions");
  if (exists) return;

  await knex.schema.createTable("questions", (table) => {
    table.increments("id").primary();
    table
      .integer("component_id")
      .unsigned()
      .references("id")
      .inTable("components")
      .onDelete("CASCADE");
    table.text("first_text").notNullable();
    table.text("second_text").notNullable();
    table.string("image_url");
    table.string("video_url");
    table.integer("position").notNullable().defaultTo(1);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("questions");
}
