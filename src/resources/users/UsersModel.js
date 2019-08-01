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

  static getNotificationsInfo() {
    return db('users')
      .select('username', 'email', 'title', 'scheduled_at')
      .join('todos', 'users.id', 'user_id')
      .whereRaw("notify = true AND repeat != 'no-repeat' AND scheduled_at::date - '5 hour'::interval <= now()");
  }
}
