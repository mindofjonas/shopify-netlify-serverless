exports.up = function (knex, Promise) {
  return knex.schema.createTable('shops', (table) => {
    table.increments().primary();
    table.string('shopify_domain').notNullable().unique();
    table.string('access_token').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('shops');
};
