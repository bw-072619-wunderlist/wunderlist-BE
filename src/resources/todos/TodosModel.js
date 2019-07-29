import db from '../../data/dbConfig';

export class TodosModel {
  static create = (todo) => {
    return db('todos')
      .insert(todo)
      .returning('*')
      .first();
  }

  static read = (id = null) => {
    if(id) {
      return db('todos')
        .where({ id })
        .first();
    }
    return db('todos');
  }
}
