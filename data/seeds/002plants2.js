exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('plants')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {
          id: 1,
          nickname: 'Aloe Vera',
          species: 'Aloe Vera',
          image_url:
            'https://images.unsplash.com/photo-1567689265664-1c48de61db0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80',
          date: new Date().toUTCString(),
          user_id: 1,
        },
        {
          id: 2,
          nickname: 'Desert Rose',
          species: 'Adenium Obesium',
          image_url:
            'https://images.unsplash.com/photo-1586170112425-3adf1ed0146e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          date: new Date().toUTCString(),
          user_id: 1,
        },
        {
          id: 3,
          nickname: 'Boston Fern',
          species: 'Nephrolepis Exaltata',
          image_url:
            'https://www.plantshop.me/media/product/89280-00-bakie_20190222085524.jpg',
          date: new Date().toUTCString(),
          user_id: 1,
        },
      ]);
    });
};
