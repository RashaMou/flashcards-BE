exports.up = function (knex) {
  return knex.schema.table("cards", (tbl) => {
    tbl.dropColumn("user_id");
  });
};

exports.down = function (knex) {};
