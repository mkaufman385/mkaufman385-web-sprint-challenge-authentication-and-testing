// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

// dont forget beforeAll and beforeEach.

//Do tests on the model first and then endpoints
