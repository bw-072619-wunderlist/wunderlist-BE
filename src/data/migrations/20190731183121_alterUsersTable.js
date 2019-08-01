
exports.up = function(knex) {
  return knex.schema
    .alterTable('users', tbl => {
      tbl.text('avatar')
        .defaultTo('https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png');
      tbl.boolean('notify')
        .defaultTo(true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .alterTable('users', tbl => {
      tbl.dropColumn('avatar');
      tbl.dropColumn('notify');
    });
};
