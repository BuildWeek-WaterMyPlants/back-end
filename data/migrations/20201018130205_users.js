exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('username', 128).notNullable().unique().index();
      tbl.string('password', 128).notNullable();
    })
    .createTable('plants', (tbl) => {
      tbl.increments();
      tbl.string('nickname', 128).notNullable().index();
      tbl.string('species', 128);
      tbl.string('image_url');
      tbl.dateTime('date');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');
    })
    .createTable('notes', (tbl) => {
      tbl.increments();
      tbl.string('title', 128).notNullable().index();
      tbl.string('body', 500).notNullable();
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
      tbl.string('body', 500).notNullable();
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
