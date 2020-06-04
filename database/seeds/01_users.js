exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { id: 1, name: "Rasha", email: "rasha@rasha.dev" },
        { id: 2, name: "Mara", email: "mara@mara.com" },
        { id: 3, name: "Sally", email: "sally@sally.com" },
      ]);
    });
};
