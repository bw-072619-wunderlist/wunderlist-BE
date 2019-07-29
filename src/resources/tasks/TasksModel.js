import db from '../../data/dbConfig';

export class TasksModel {
  static create = (task) => {
    return db('tasks')
      .insert(task, '*')
      .first();
  }
}
