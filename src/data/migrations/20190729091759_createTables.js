
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username')
        .unique()
        .notNullable();
      tbl.text('email')
        .unique()
        .notNullable();
      tbl.text('password')
        .notNullable();
    })
    .createTable('todos', tbl => {
      tbl.increments();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.text('title')
        .notNullable();
      tbl.text('description');
      tbl.boolean('completed')
        .defaultTo(false);
      tbl.boolean('deleted')
        .defaultTo(false);
      tbl.dateTime('scheduled_at')
        .defaultTo(null);
      tbl.text('repeat')
        .defaultTo('no-repeat');
      tbl.timestamps(false, true);
      tbl.unique(['user_id', 'title']);
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.integer('todo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('todos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.text('name')
        .notNullable();
      tbl.text('notes');
      tbl.boolean('completed')
        .defaultTo(false);
      tbl.timestamps(false, true);
      tbl.unique(['todo_id', 'name']);
    })
    .createTable('histories', tbl => {
      tbl.increments();
      tbl.integer('todo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('todos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.timestamp('completed_at')
        .defaultTo(knex.fn.now());
      tbl.unique(['todo_id', 'completed_at']);
    })
    .createTable('shares', tbl => {
      tbl.increments();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('todo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('todos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.unique(['user_id', 'todo_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('shares')
  .dropTableIfExists('histories')
  .dropTableIfExists('tasks')
  .dropTableIfExists('todos')
  .dropTableIfExists('users');
};
