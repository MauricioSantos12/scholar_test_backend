export async function up(knex) {
  const hasTestTypes = await knex.schema.hasTable("test_types");
  if (!hasTestTypes) {
    await knex.schema.createTable("test_types", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("description");
      table.boolean("is_active").notNullable().defaultTo(true);
      table.timestamps(true, true);
    });

    await knex("test_types").insert([
      {
        name: "Tipo 1",
        description: "Test básico de preguntas y resultados",
        is_active: true,
      },
      {
        name: "Tipo 2",
        description: "Test con explicaciones o videos según respuestas",
        is_active: true,
      },
      {
        name: "Tipo 3",
        description: "Test con videos justificativos por cada respuesta",
        is_active: true,
      },
    ]);
  }

  const hasTypeId = await knex.schema.hasColumn("tests", "type_id");
  if (!hasTypeId) {
    await knex.schema.alterTable("tests", (table) => {
      table
        .integer("type_id")
        .unsigned()
        .references("id")
        .inTable("test_types")
        .onDelete("SET NULL");
    });
  }
}

export async function down(knex) {
  const hasTypeId = await knex.schema.hasColumn("tests", "type_id");
  if (hasTypeId) {
    await knex.schema.alterTable("tests", (table) => {
      table.dropColumn("type_id");
    });
  }

  await knex.schema.dropTableIfExists("test_types");
}
