const db = require("../../config/db_config");

// GET DECK BY ID

const findById = async (id) => {
  return db("decks").where({ id });
};

// ADD DECK
const add = async (user_id, name) => {
  const [id] = await db("decks").insert({ name, user_id }, "id");
  const newDeck = await findById(id);
  return newDeck;
};

// UPDATE DECK
const update = async (id, newName) => {
  const updated = await db("decks").where({ id }).update(newName);
  if (updated === 1) {
    const deck = await findById(id);
    return deck;
  }
};

// DELETE DECK
const remove = async (id) => {
  const deleted = await db("decks").where({ id }).del();
  return deleted;
};

// GET DECK'S CARDS
const getDeckCards = async (id) => {
  const deckCards = await db("cards")
    .select("cards.id", "cards.deck_id", "cards.question", "cards.answer")
    .join("decks", "decks.id", "cards.deck_id")
    .where("decks.id", id);
  return deckCards;
};

module.exports = {
  add,
  remove,
  findById,
  update,
  getDeckCards,
};
