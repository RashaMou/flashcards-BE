const router = require("express").Router();
const Users = require("../../database/models/users-model");
const Decks = require("../../database/models/decks-model");

// GET ALL USERS
/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Users[]} users Array of users
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * [{
 * "id": 1,
 * "name": "Rasha Moumneh"
 * "email": "rasha@rasha.dev"
 * },
 * {
 * "id": 2,
 * "name": "Mara Hughes"
 * "email": "mara@mara.com"
 * }]
 *
 *
 */

router.get("/", async (req, res) => {
  let allUsers = await Users.findUsers();
  try {
    if (allUsers) {
      res.status(200).json(allUsers);
    } else {
      res.status(404).json("No users found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

// GET USER BY ID

/**
 * @api {get} /users Get user by ID
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User id
 *
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} email User email
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "id": 1,
 * "name": "Rasha Moumneh"
 * "email": "rasha@rasha.dev"
 * }
 */

router.get("/:id", async (req, res) => {
  let user = await Users.findById(req.params.id);
  try {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No user with that id found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  const userId = await req.params.id;
  const userChanges = await req.body;
  try {
    const updatedUser = await Users.updateUser(userId, userChanges);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleting = await Users.deleteUser(userId);
    res.status(200).json(deleting);
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// GET ALL USER'S DECKS
/**
 * @api {get} /users Get all user's decks
 * @apiName GetDecks
 * @apiGroup Decks
 *
 * @apiSuccess {Decks[]} decks Array of decks
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * [{
 * "id": 1,
 * "user_id": 2
 * "name": "Javascript"
 * },
 * {
 * "id": 2,
 * "user_id": 2
 * "name": "Ruby"
 * }]
 *
 *
 */

router.get("/:id/decks", async (req, res) => {
  const decks = await Users.getUserDecks(req.params.id);
  try {
    if (decks.length > 0) {
      res.status(200).json(decks);
    } else {
      res.status(404).json("User has no decks");
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving decks" });
  }
});

router.get("/:id/cards", async (req, res) => {
  const cards = await Users.getUserCards(req.params.id);
  try {
    if (cards.length > 0) {
      res.status(200).json(cards);
    } else {
      res.status(404).json("User has no cards");
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cards" });
  }
});

module.exports = router;
