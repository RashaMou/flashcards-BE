const request = require("supertest");
const server = require("../api/server");

const db = require("../config/db_config");

describe("decks endpoints", () => {
  describe("GET /:id", () => {
    it("should return 200 ok", async () => {
      await request(server).get("/api/decks/1").expect(200);
    });
  });

  describe("Adding a deck", () => {
    it("should return 201 and an array", async () => {
      const res = await request(server)
        .post("/api/decks")
        .send({ name: "C++", user_id: 2 });
      expect(res.status).toBe(201);
      expect(res.body.length).not.toBe(0);
    });
  });
});
