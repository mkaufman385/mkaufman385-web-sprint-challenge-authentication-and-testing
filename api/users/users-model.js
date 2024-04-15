const db = require("../../data/dbConfig");

function find() {
  return db("users");
}

function findBy(id) {
  return db("users").where(id);
}

module.exports = {
  find,
  findBy,
};
