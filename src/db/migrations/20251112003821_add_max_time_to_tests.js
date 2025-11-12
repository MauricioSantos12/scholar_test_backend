export function up(knex) {
  return knex.schema.table("tests", function (table) {
    table.integer("max_time_minutes").nullable();
  });
}

export function down(knex) {
  return knex.schema.table("tests", function (table) {
    table.dropColumn("max_time_minutes");
  });
}
