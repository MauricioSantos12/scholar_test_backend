export async function up(knex) {
  const exists = await knex.schema.hasTable("users");
  if (exists) return;

  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table.string("identification_number").unique().notNullable();
    table.string("name").notNullable();
    table.string("second_name");
    table.string("last_name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.date("date_birth");
    table.string("school_name");
    table.integer("graduation_year");
    table.string("city");
    table.string("phone_number");
    table.string("parent_name");
    table.string("parent_email");
    table.string("parent_phone");

    table.enum("role", ["admin", "student"]).notNullable().defaultTo("student");

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
