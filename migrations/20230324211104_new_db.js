/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("todoappusers", (table) => {
      table.increments("id").primary();
      table
        .uuid("uuid", { primaryKey: false, useBinaryUuid: true })
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("username").unique();
      table.string("password");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("todolist", (table) => {
      table.increments("id").primary();
      table
        .integer("todoappusers_id")
        .unsigned()
        .references("id")
        .inTable("todoappusers");
      table.string("title");
      table.text("description");
      table.boolean("done").defaultTo(false)
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("todolist").dropTable("todoappusers");
};
