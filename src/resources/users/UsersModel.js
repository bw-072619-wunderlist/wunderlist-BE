import db from '../../data/dbConfig';

export class UsersModel {
  static create = (user) => {
    return db('users')
      .insert(user)
      .returning('id', 'email');
  }
}
