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

  static update = (id, changes) => {
    return db('todos')
      .update(changes, '*')
      .where({ id })
      .first();
  }

  static delete = (id) => {
    return db('todos')
      .delete()
      .where({ id })
      .returning('*')
      .first();
  }
}
