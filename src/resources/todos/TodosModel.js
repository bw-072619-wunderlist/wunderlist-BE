import db from '../../data/dbConfig';

export class TodosModel {
  static create(todo) {
    return db('todos')
      .insert(todo)
      .returning('*');
  }

  static read(user_id, id = null) {
    if(id) {
      return db('todos')
        .where({ user_id, id })
        .first();
    }
    return db('todos')
      .select('todos.id', 'user_id', 'title', 'description', 'scheduled_at', 'repeat', 'completed', 'deleted', 'created_at', 'updated_at', 'todo_id', 'completed_at')
      .leftJoin('histories', 'todos.id', 'histories.todo_id')
      .where({ user_id })
      .orderBy('todos.id');
  }

  static update(id, changes) {
    return db('todos')
      .update(changes, '*')
      .where({ id });
  }

  static delete(id) {
    return db('todos')
      .delete()
      .where({ id })
      .returning('*');
  }
}
