const router = require("express").Router();
const Users = require("../../database/models/users-model");
const Decks = require("../../database/models/decks-model");
const log = require("../../helpers/logger");

// FIND DECK BY ID
/**
 * @api {get} /decks Get deck by ID
 * @apiName GetDeck
 * @apiGroup Decks
 *
 * @apiParam {Number} id Deck id
 *
 * @apiSuccess {Number} id Deck id
 * @apiSuccess {String} name Deck name
 * @apiSuccess {Number} user_id Deck user_id
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "id": 1,
 * "user_id": 2
 * "name": "Javascript"
 * }
 */

router.get("/:id", async (req, res) => {
  const deck = await Decks.findById(req.params.id);
  try {
    if (deck.length > 0) {
      res.status(200).json(deck);
    } else {
      res.status(404).json("No deck with that id found");
    }
  } catch (error) {
    log.error(error);
    res.status(500).json("Error retrieving deck from database");
  }
});

// ADD DECK
/**
 * @api {post} /decks Add deck
 * @apiName AddDeck
 * @apiGroup Decks
 *
 * @apiParam {Number} user_id Deck user_id
 * @apiParam {String} name Deck name
 *
 * @apiSuccess {Number} id Deck id
 * @apiSuccess {String} name Deck name
 * @apiSuccess {Number} user_id Deck user_id
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "id": 1,
 * "user_id": 2
 * "name": "Javascript"
 * }
 */

router.post("/", async (req, res) => {
  const { user_id, name } = req.body;

  try {
    const deck = await Decks.add(user_id, name);
    if (deck) {
      res.status(201).json(deck);
    }
  } catch (error) {
    log.error(error);
    res.status(200).json;
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Decks.remove(id);
    if (deleted) {
      res.status(200).json(`Deck with if ${id} successfully deleted.`);
    }
  } catch (error) {
    log.error(error);
    res.status(500).json("Error deleting deck");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newName = req.body;
  try {
    const updated = await Decks.update(id, newName);
    if (updated) {
      res.status(200).json({ message: "Deck successfully updated", updated });
    }
  } catch (error) {
    log.error(error);
    res.status(500).json("Error updating deck.");
  }
});

router.get("/:id/cards", async (req, res) => {
  const cards = await Decks.getDeckCards(req.params.id);
  try {
    if (cards.length > 0) {
      res.status(200).json(cards);
    } else {
      res.status(404).json("Deck has no cards");
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cards" });
  }
});

module.exports = router;
