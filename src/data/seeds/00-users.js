const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('truncate users cascade;')
    .then(function () {
      return knex('users').insert([
        {
          username: 'eneh',
          email: 'eneh@abc.co',
          password: bcrypt.hashSync('1234abcd', 12)
        },
        {
          username: 'egge',
          email: 'egge@abc.co',
          password: bcrypt.hashSync('1234abcd', 12)
        },
        {
          username: 'dora',
          email: 'dora@abc.co',
          password: bcrypt.hashSync('1234abcd', 12)
        },
        {
          username: 'james',
          email: 'james@abc.co',
          password: bcrypt.hashSync('1234abcd', 12)
        }
      ]);
    });
};
