const request = require("supertest");
const server = require("../api/server");

const db = require("../config/db_config");

beforeEach(() => db.seed.run());

afterAll(async () => {
  await db.raw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

describe("users endpoints", () => {
  describe("GET /", () => {
    it("should return 200", async () => {
      await request(server).get("/api/users").expect(200);
    });
    it("should be an object/array", async () => {
      const response = await request(server).get("/api/users").expect(200);
      expect(typeof response.body).toBe("object");
    });
    it("should return a length of 3", async () => {
      const response = await request(server).get("/api/users").expect(200);
      expect(response.body.length).toBe(3);
    });
  });
  describe("GET /:id", () => {
    it("should return 200", async () => {
      const response = await request(server).get("/api/users/1").expect(200);
      expect(response.status).toBe(200);
    });
    it("should be an object/array", async () => {
      const response = await request(server).get("/api/users/1").expect(200);
      expect(typeof response.body).toBe("object");
    });
    it("should return the right user", async () => {
      const expected = { id: 1, name: "Rasha", email: "rasha@rasha.dev" };
      const response = await request(server).get("/api/users/1").expect(200);
      expect(response.body[0].email).toBe(expected.email);
    });
  });
  describe("PUT /", () => {
    it("changes email of user", async () => {
      const user = { email: "newsally@sally.com" };
      await request(server)
        .put("/api/users/3")
        .send(user)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      const getUser = await request(server).get("/api/users/3");
      expect(getUser.body[0].email).toEqual("newsally@sally.com");
    });
  });
  describe("DELETE /", () => {
    it("should return 200", async () => {
      await request(server).delete("/api/users/3").expect(200);
    });
  });
  describe("GET /:id/decks", () => {
    it("returns 200 and an array if user has decks", async () => {
      const response = await request(server).get("/api/users/1/decks");
      expect(response.status).toBe(200);
      // expect(response.body.length).not.toBe(0);
    });
  });
});
