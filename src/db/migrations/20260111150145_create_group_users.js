exports.up = function (knex) {
  return knex.schema.createTable("group_users", function (table) {
    table.increments("id").primary();

    table
      .integer("group_id")
      .unsigned()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE");

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamps(true, true);

    table.unique(["group_id", "user_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("group_users");
};
