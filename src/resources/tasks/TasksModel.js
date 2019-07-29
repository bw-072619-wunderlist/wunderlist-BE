import db from '../../data/dbConfig';

export class TasksModel {
  static create = (task) => {
    return db('tasks')
      .insert(task, '*');
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

  static delete = (id) => {
    return db('tasks')
      .delete()
      .where({ id })
      .returning('*')
      .first();
  }
}
