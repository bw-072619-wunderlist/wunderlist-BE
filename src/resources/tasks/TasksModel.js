import db from '../../data/dbConfig';

export class TasksModel {
  static create = (task) => {
    return db('tasks')
      .insert(task, '*')
      .first();
  }

  static read = (todo_id = null) => {
    if(todo_id) {
      return db('tasks')
        .where({ todo_id });
    }
    return db('tasks');
  }

  static update = (id, changes) => {
    return db('tasks')
      .update(changes, '*')
      .where({ id })
      .first();
  }
}
