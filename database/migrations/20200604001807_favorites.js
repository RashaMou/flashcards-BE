exports.up = function (knex) {
  return knex.schema.createTable("favorites", (tbl) => {
    tbl.increments("id");
    tbl
      .integer("card_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("cards")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites");
};
