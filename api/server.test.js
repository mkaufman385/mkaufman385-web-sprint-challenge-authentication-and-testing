const db = require("../data/dbConfig");
const Joke = require("../api/users/users-model");

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
    const result = await Joke.find();
    expect(result).toHaveLength(0);
    expect(result).toMatchObject([]);
  });
});

describe("findById", () => {
  test("resolves user by id", async () => {
    const result = await Joke.findById();
    expect(result);
  });
});
