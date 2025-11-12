export async function up(knex) {
  const exists = await knex.schema.hasTable("areas");
  if (exists) return;

  await knex.schema.createTable("areas", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.string("image_url");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("areas");
}
