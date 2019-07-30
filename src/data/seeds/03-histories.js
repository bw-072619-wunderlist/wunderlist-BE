
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('histories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('histories').insert([
        {
          todo_id: 2, 
          completed_at: '2019-07-20T12:07:00.777Z'
        },
        {
          todo_id: 2
        },
        {
          todo_id: 5, 
          completed_at: '2019-07-20T12:07:00.777Z'
        },
        {
          todo_id: 5
        },
        {
          todo_id: 9, 
          completed_at: '2019-07-20T12:07:00.777Z'
        },
        {
          todo_id: 9
        },
      ]);
    });
};
