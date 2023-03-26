/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("todolist", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.text("description");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("todoappusers", (table) => {
      table.increments("id").primary();
      table.uuid("uuid").unique().defaultTo(knex.raw("UUID()"));
      table.string("username").unique();
      table.string("email").unique();
      table.string("password");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table
        .integer("todolist_id")
        .unsigned()
        .references("id")
        .inTable("todolist");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("todoappusers").dropTable("todolist");
};
