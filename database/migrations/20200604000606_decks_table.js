exports.up = function (knex) {
  return knex.schema.createTable("decks", (tbl) => {
    tbl.increments("id");
    tbl.string("name").notNullable();
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("decks");
};
