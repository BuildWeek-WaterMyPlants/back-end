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
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
