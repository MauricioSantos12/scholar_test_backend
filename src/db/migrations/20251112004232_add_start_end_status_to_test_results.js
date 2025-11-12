export function up(knex) {
  return knex.schema.table("test_results", function (table) {
    table.timestamp("start_time").nullable();
    table.timestamp("end_time").nullable();
    table
      .enu("status", ["in_progress", "completed", "expired"])
      .defaultTo("completed");
  });
}

export function down(knex) {
  return knex.schema.table("test_results", function (table) {
    table.dropColumn("start_time");
    table.dropColumn("end_time");
    table.dropColumn("status");
  });
}
