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
  return db('tasks').select(
    'id',
    'title',
    'body',
    'h2o_frequency',
    'date',
    'plant_id'
  );
}

function findByPlant(plantid) {
  return db('tasks').where('plant_id', plantid);
}

function add(note, plantid) {
  note.plant_id = plantid;
  return db('tasks').insert(note, 'id');
}

function findById(id) {
  return db('tasks').where({ id }).first();
}

function update(id, changes) {
  return db('tasks').where({ id }).update(changes);
}

async function remove(id) {
  const found = await findById(id);
  return db('tasks')
    .where({ id })
    .delete()
    .then(() => {
      return found;
    });
}
