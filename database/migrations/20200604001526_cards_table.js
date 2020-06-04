exports.up = function (knex) {
  return knex.schema.createTable("cards", (tbl) => {
    tbl.increments("id");
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("deck_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("decks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("question", 500).notNullable();
    tbl.string("answer", 1000).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cards");
};
