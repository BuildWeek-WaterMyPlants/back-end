exports.up = function (knex) {
  return knex.schema
    .createTable('notes', (tbl) => {
      tbl.increments();
      tbl.string('body', 500).notNullable().index();
      tbl.dateTime('date');
      tbl
        .integer('plant_id')
        .unsigned()
        .notNullable()
        .references('plants.id')
        .onDelete('CASCADE');
    })
    .createTable('tasks', (tbl) => {
      tbl.increments();
      tbl.string('title', 128).notNullable().index();
      tbl.string('body', 500);
      tbl.integer('h2o_frequency');
      tbl.dateTime('date');
      tbl
        .integer('plant_id')
        .unsigned()
        .notNullable()
        .references('plants.id')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('notes')
    .dropTableIfExists('plants')
    .dropTableIfExists('users');
};
