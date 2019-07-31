
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shares').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('shares').insert([
        {
          user_id: 2,
          todo_id: 2
        },
        {
          user_id: 3,
          todo_id: 2
        },
        {
          user_id: 4,
          todo_id: 2
        }
      ]);
    });
};
