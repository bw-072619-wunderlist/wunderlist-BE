import { TodosModel as Todos } from './TodosModel';
import { TasksModel as Tasks } from '../tasks/TasksModel';
import { isArray, isObject } from 'util';

export class TodosController {
  static async create(req, res, next) {
    try {
      const { id } = req.user;
      let { tasks } = req.body;
      let rawTodo = { ...req.body };
      delete rawTodo.tasks;
      
      const todo = await Todos.create({
        ...rawTodo,
        user_id: id
      });
      let tasksList = [];
      if(tasks) {
        tasks = tasks.map(task => ({
          ...task,
          todo_id: todo[0].id
        }));
        tasksList = await Tasks.create(tasks);
      }
      res.status(201)
        .json({
          ...todo[0],
          tasks: tasksList
        });
    } catch(error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const { id } = req.params;
      let todos = id? await Todos.read(req.user.id, id) : await Todos.read(req.user.id);
      if(isArray(todos)) { 
        if(todos.length < 1) {
          return res.status(200)
            .json(todos);
        }
        const histories = await Todos.readHistories(req.user.id);
        todos = todos.map(todo => {
          todo.histories = histories.filter(item => item.todo_id === todo.id);
          return todo;
        });
        return res.status(200)
          .json(todos);
      }
      if(isObject(todos) && todos.id) {
        const tasks = await Tasks.read(todos.id);
        return res.status(200)
          .json({
            ...todos,
            tasks
          });
      }
      res.status(404)
        .json({
          message: 'Todo with the supplied todo_id does not exist'
        });
    } catch(error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { completed, repeat } = req.body;
      const updated = await Todos.update(req.params.id, {...req.body, completed: false});
      if(updated[0] && updated[0].id) {
        if(completed && repeat && repeat !== 'no-repeat') {
          await Todos.insertHistory({todo_id: req.params.id});
        }
        return res.status(200)
          .json({
            message: 'Successful todo update',
            updated: updated[0]
          });
      }
      res.status(404)
        .json({
          message: 'Todo with the supplied id does not exist'
        });
    } catch(error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const deleted = await Todos.update(req.params.id, { deleted: true });
      if(deleted[0] && deleted[0].id) {
        return res.status(200)
          .json({
            message: 'Successful todo delete toggle',
            deleted: deleted[0]
          });
      }
      res.status(404)
        .json({
          message: 'Todo with the supplied id does not exist'
        });
    } catch(error) {
      next(error);
    }
  }

  static async addTodoTask(req, res, next) {
    try {
      const { id } = req.params;
      let rawTasks = req.body;
      rawTasks = rawTasks.map(task => ({
        ...task,
        todo_id: id
      }));
      const tasks = await Tasks.create(rawTasks);
      res.status(201)
        .json(tasks);
    } catch(error) {
      next(error);
    }
  }
}
