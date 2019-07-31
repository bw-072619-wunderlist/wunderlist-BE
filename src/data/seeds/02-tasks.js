
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          todo_id: 1,
          name: 'Prep for screening'
        },
        {
          todo_id: 5,
          name: 'Prep for conference'
        },
        {
          todo_id: 9,
          name: 'Prep for convention'
        },
        {
          todo_id: 2,
          name: 'Say morning prayer'
        },
        {
          todo_id: 2,
          name: 'Take your breakfast'
        },
        {
          todo_id: 2,
          name: 'Use the gym'
        },
        {
          todo_id: 6,
          name: 'Do the early morning workout'
        },
        {
          todo_id: 6,
          name: 'Take your morning bath'
        },
        {
          todo_id: 6,
          name: 'Call the paper vendor'
        },
        {
          todo_id: 10,
          name: 'Prep for work'
        },
        {
          todo_id: 10,
          name: 'Pick the a cab to office'
        },
        {
          todo_id: 10,
          name: 'Call the secretary for a cup of coffee'
        }
      ]);
    });
};
