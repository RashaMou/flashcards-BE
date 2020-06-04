exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("decks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("decks").insert([
        { id: 1, user_id: 1, name: "Javascript" },
        { id: 2, user_id: 2, name: "Geography" },
        { id: 3, user_id: 1, name: "Literature" },
        { id: 4, user_id: 3, name: "Math" },
      ]);
    });
};
