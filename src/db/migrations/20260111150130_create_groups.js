exports.up = function (knex) {
  return knex.schema.createTable("groups", function (table) {
    table.increments("id").primary();

    table.string("name").notNullable();
    table.text("description");

    table.string("school_name");
    table.string("city");

    table.boolean("is_active").defaultTo(true);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("groups");
};
