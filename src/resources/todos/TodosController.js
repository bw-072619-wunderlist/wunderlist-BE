import { TodosModel as Todos } from './TodosModel';
import { TasksModel as Tasks } from '../tasks/TasksModel';
import { isArray } from 'util';

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
}
