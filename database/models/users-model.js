const db = require("../../config/db_config");

// GET ALL USERS
const findUsers = () => {
  return db("users");
};

// FIND USER BY ID
const findById = async (id) => {
  const user = await db("users").where("id", id);
  return user;
};

// FIND BY {PARAM}
function findBy(filter) {
  return db("users").where(filter);
}

// UPDATE USER
const updateUser = async (id, post) => {
  const response = await db("users").where("id", id).update(post);
  if (response === 1) {
    const user = await findById(id);
    return user;
  }
};

// DELETE USER
const deleteUser = (id) => {
  return db("users").where("id", id).del();
};

// GET USER'S DECKS
const getUserDecks = async (id) => {
  const userdecks = await db("decks")
    .select("decks.name", "decks.id", "decks.user_id")
    .join("users", "users.id", "decks.user_id")
    .where("users.id", id);
  return userdecks;
};

module.exports = {
  findUsers,
  findById,
  findBy,
  updateUser,
  deleteUser,
  getUserDecks,
  // addDeck,
};
