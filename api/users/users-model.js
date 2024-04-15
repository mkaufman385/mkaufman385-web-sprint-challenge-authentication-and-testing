const db = require("../../data/dbConfig");

function find() {
  return db("users");
}

function findBy(user_id) {
  return db("users").where("users.user_id", user_id).first();
}

async function add({ username, password }) {
  const [user_id] = await db("users").insert({ username, password });
  return findBy(user_id);
}

module.exports = {
  find,
  findBy,
  add,
};
