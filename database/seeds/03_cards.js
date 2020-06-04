exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cards")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cards").insert([
        {
          id: 1,
          deck_id: 1,
          user_id: 1,
          question: "What is Javascript?",
          answer: "A programming language",
        },
        {
          id: 2,
          deck_id: 2,
          user_id: 2,
          question: "What is the capital of Lebanon?",
          answer: "Beirut",
        },
        {
          id: 3,
          deck_id: 3,
          user_id: 1,
          question: "William what?",
          answer: "Shakespeare",
        },
        { id: 4, deck_id: 4, user_id: 3, question: "1+1?", answer: "2" },
      ]);
    });
};
