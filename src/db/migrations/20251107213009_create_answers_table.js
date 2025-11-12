export async function up(knex) {
  const exists = await knex.schema.hasTable("answers");
  if (exists) return;

  await knex.schema.createTable("answers", (table) => {
    table.increments("id").primary();
    table
      .integer("question_id")
      .unsigned()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");
    table.text("text").notNullable();
    table.string("image_url");
    table.decimal("value", 5, 2).notNullable().defaultTo(0);
    table.boolean("is_correct").notNullable().defaultTo(false);
    table.text("explanation");
    table.string("video_url");
    table.integer("position").notNullable().defaultTo(1);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("answers");
}
