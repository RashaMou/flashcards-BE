const db = require("../../config/db_config");

// GET CARD BY ID
const findById = async (id) => {
  return db("cards").where({ id });
};

// ADD CARD
const add = async (deck_id, name) => {
  const [id] = await db("cards").insert({ name, deck_id }, "id");
  const newCard = await findById(id);
  return newCard;
};

// UPDATE CARD
const update = async (id, changes) => {
  const updated = await db("cards").where({ id }).update(changes);
  if (updated === 1) {
    const card = await findById(id);
    return card;
  }
};

// DELETE DECK
const remove = async (id) => {
  const deleted = await db("cards").where({ id }).del();
  return deleted;
};

module.exports = {
  add,
  remove,
  findById,
  update,
};
