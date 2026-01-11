exports.up = function (knex) {
  return knex.schema.createTable("group_tests", function (table) {
    table.increments("id").primary();

    table
      .integer("group_id")
      .unsigned()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE");

    table
      .integer("test_id")
      .unsigned()
      .references("id")
      .inTable("tests")
      .onDelete("CASCADE");

    table.integer("max_attempts").notNullable().defaultTo(1);

    table.timestamp("available_from").nullable();
    table.timestamp("available_until").nullable();

    table.boolean("is_active").defaultTo(true);

    table.timestamps(true, true);

    table.unique(["group_id", "test_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("group_tests");
};
