/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products_categories", (table) => {
    knex.integer("product_id").unsigned().notNullable();
    table
      .foreign("product_id")
      .references("product_id")
      .inTable("products")
      .onDelete("cascade");
    table.integer("category_id").unsigned().notNullable();
    table
      .foreign("category_id")
      .references("category_id")
      .inTable("categories")
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products_categories");
};
