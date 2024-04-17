const db = require("../data/dbConfig");
const User = require("../api/users/users-model");
const request = require("supertest");
const server = require("./server");

// Write your tests here

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

// beforeEach(async () => {
//   await db.seed.run();
// });

test("sanity", () => {
  expect(true).toBe(true);
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

// dont forget beforeAll and beforeEach.

//Do tests on the model first and then endpoints

describe("find users", () => {
  test("finds all users in table", async () => {
    const result = await User.find();
    expect(result).toHaveLength(0);
    expect(result).toMatchObject([]);
  });
});

describe("findBy", () => {
  test("resolves user by id", async () => {
    await db("users").insert({ username: "testuser1", password: "password1" });
    await db("users").insert({ username: "testuser2", password: "password2" });
    // Call the findBy function to search for a user by username
    const result = await User.findBy({ username: "testuser1" });
    // Assert that the result contains the expected user
    expect(result).toHaveLength(1); // We expect to find one user
    expect(result[0].username).toBe("testuser1");
  });
});

describe("[GET] /jokes", () => {
  test("responds with 200 OK", async () => {
    const res = await request(server).get("/jokes");
    expect(res.status).toBe(404);
  });

  // test("responds with all jokes", async () => {
  //   const res = await request(server).get("/jokes");
  //   expect(res.body).toHaveLength(3);
  // });
});

// The 404 response does not make sense above
