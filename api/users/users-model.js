const db = require("../../data/dbConfig");

//USER MODEL IS NEEDED. All the user routing can be handled in the auth router

function find() {
  return db("users").select("username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(user_id) {
  return db("users")
    .select("username", "password")
    .where("user_id", user_id)
    .first();
}

async function add({ username, password }) {
  const [user_id] = await db("users").insert({ username, password });
  return findById(user_id);
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};
