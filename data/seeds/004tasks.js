exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          id: 1,
          title: 'task1',
          body: 'task1 body',
          plant_id: 1,
          date: new Date().toUTCString(),
        },
        {
          id: 2,
          title: 'task2',
          body: 'task2 body',
          plant_id: 1,
          date: new Date().toUTCString(),
        },
        {
          id: 3,
          title: 'task3',
          body: 'task3 body',
          plant_id: 1,
          date: new Date().toUTCString(),
        },
      ]);
    });
};
