const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findByPlant,
  findById,
  update,
  remove,
};

function find() {
  return db('notes').select('id', 'body', 'date', 'plant_id');
}

function findByPlant(plantid) {
  return db('notes').where('plant_id', plantid);
}

function add(note, plantid) {
  note.plant_id = plantid;
  return db('notes').insert(note, 'id');
}

function findById(id) {
  return db('notes').where({ id }).first();
}

function update(id, changes) {
  return db('notes').where({ id }).update(changes);
}

async function remove(id) {
  const found = await findById(id);
  return db('notes')
    .where({ id })
    .delete()
    .then(() => {
      return found;
    });
}
