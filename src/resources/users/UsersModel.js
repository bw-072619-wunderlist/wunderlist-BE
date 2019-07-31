import db from '../../data/dbConfig';

export class UsersModel {
  static create(user) {
    return db('users')
      .insert(user)
      .returning('*');
  }

  static read(email = null) {
    if(email) {
      return db('users')
        .where({ email })
        .first();
    }
    return db('users')
      .select('id', 'username', 'email', 'avatar', 'notify');
  }
}
