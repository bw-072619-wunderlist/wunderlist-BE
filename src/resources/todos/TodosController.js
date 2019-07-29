import { TodosModel as Todos } from './TodosModel';
import { TasksModel as Tasks } from '../tasks/TasksModel';
import { isArray, isObject } from 'util';

export class TodosController {
  static create = async (req, res, next) => {
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
          todo_id: todo.id
        }));
        tasksList = await Tasks.create(tasks);
      }
      res.status(201)
        .json({
          ...todo,
          tasks: tasksList
        });
    } catch(error) {
      next(error);
    }
  }

  static read = async (req, res, next) => {
    try {
      const { id } = req.params;
      const todos = id? await Todos.read(req.user.id, id) : await Todos.read(req.user.id);
      if(isArray(todos) && todos.length > 0) {
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

  static update = async (req, res, next) => {
    try {
      const updated = await Todos.update(req.params.id, req.body);
      if(updated && updated.id) {
        return res.status(200)
          .json({
            message: 'Successful todo update',
            updated
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
}
