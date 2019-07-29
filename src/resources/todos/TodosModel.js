import db from '../../data/dbConfig';

export class TodosModel {
  static create = (todo) => {
    return db('todos')
      .insert(todo)
      .returning('*')
      .first();
  }
}
