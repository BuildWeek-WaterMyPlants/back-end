exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1,
          body: 'note1 body',
          plant_id: 1,
          date: new Date().toUTCString(),
        },
        {
          id: 2,
          body: 'note2 body',
          plant_id: 1,
          date: new Date().toUTCString(),
        },
        {
          id: 3,
          body: 'note3 body',
          plant_id: 1,
          date: new Date().toUTCString(),
        },
      ]);
    });
};
