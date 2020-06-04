const db = require("../../config/db_config");

// GET ALL USER DECKS
const findAllByUserId = (id) => {
  return db("decks").where({ user_id: id });
};

// GET DECK BY ID

// DELETE DECK

// UPDATE DECK

// ADD DECK

module.exports = {
  //   add,
  //   remove,
  findAllByUserId,
  //   findById,
  //   update,
};
