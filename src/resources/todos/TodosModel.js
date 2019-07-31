import db from '../../data/dbConfig';
import moment from 'moment';

export class TodosModel {
  static create(todo) {
    return db('todos')
      .insert(todo)
      .returning('*');
  }

  static insertHistory(history) {
    return db('histories')
      .insert(history);
  }

  static read(user_id, id = null) {
    if(id) {
      return db('todos')
        .where({ user_id, id })
        .first();
    }
    return db('todos')
      .where({ user_id });
  }

  static readHistories(user_id) {
    return db('todos')
      .select('todo_id', 'completed_at')
      .leftJoin('histories', 'todos.id', 'histories.todo_id')
      .where({ user_id })
      .orderBy('todo_id');
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

  static repeatTodos(repeat = 'daily') {
    switch(repeat) {
      case 'daily':
        const nextSchedule = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        return db('todos')
          .update({scheduled_at: nextSchedule})
          .whereRaw("repeat != 'no-repeat' AND now() < scheduled_at::date + '1 day'::interval");
      case 'weekly':
        const nextSchedule = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
        return db('todos')
          .update({scheduled_at: nextSchedule})
          .whereRaw("repeat != 'no-repeat' AND now() < scheduled_at::date + '7 day'::interval");
      case 'monthly':
        const nextSchedule = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
        return db('todos')
          .update({scheduled_at: nextSchedule})
          .whereRaw("repeat != 'no-repeat' AND now() < scheduled_at::date + '30 day'::interval");
      default:
        return null;
    }
    
  }
}
