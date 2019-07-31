import db from '../../data/dbConfig';

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
        .where({ id })
        .first();
    }
    return db('todos')
      .where({ user_id })
      .orWhereIn('id', function() {
        this.select('todo_id').from('shares');
      });
  }

  static readShares(todo_id) {
    return db('shares')
      .select('todo_id', 'username')
      .join('users', 'user_id', 'users.id')
      .where({ todo_id });
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

  static delete() {
    return db('todos')
      .delete()
      .whereRaw("deleted = true AND now() < updated_at::date + '7 day'::interval");
  }

  static repeatTodos(repeat = 'daily') {
    let nextSchedule = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
    switch(repeat) {
      case 'daily':
        return db('todos')
          .update({scheduled_at: nextSchedule})
          .whereRaw("repeat != 'no-repeat' AND now() < scheduled_at::date + '1 day'::interval");
      case 'weekly':
        nextSchedule = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
        return db('todos')
          .update({scheduled_at: nextSchedule})
          .whereRaw("repeat != 'no-repeat' AND now() < scheduled_at::date + '7 day'::interval");
      case 'monthly':
        nextSchedule = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
        return db('todos')
          .update({scheduled_at: nextSchedule})
          .whereRaw("repeat != 'no-repeat' AND now() < scheduled_at::date + '30 day'::interval");
      default:
        return null;
    }
    
  }

  static shareTodo(share) {
    return db('shares')
      .insert(share, '*');
  }
}
