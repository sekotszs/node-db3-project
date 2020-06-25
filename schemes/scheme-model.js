const knex = require("knex");

const config = require("../knexfile.js");

const db = knex(config.development);

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .orderBy("steps.step_number", "asc")
    .where({ "schemes.id": id });
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((ids) => ({ ...scheme, id: ids[0] }));
}

function update(changes, id) {
  return db("schemes").where({ id }).update(changes);
}

function remove(id) {
  return db("schemes").where({ id }).del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
