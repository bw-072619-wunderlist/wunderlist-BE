import { TasksModel as Tasks } from './TasksModel';
import { isArray } from 'util';

export class TasksController {
  static create = async (req, res, next) => {
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

  static read = async (req, res, next) => {
    try {
      const { id } = req.params;
      const tasks = id? await Tasks.read(id) : await Tasks.read();
      if(isArray(tasks) && tasks.length > 0) {
        res.status(200)
          .json(tasks);
      } else {
        res.status(404)
          .json({
            message: 'Todo with the supplied todo_id does not exist'
          });
      }
    } catch(error) {
      next(error);
    }
  }

  static update = async (req, res, next) => {
    try {
      const updated = await Tasks.update(req.params.id, req.body);
      if(updated && updated.name) {
        res.status(200)
          .json({
            message: 'Successful task update',
            updated
          });
      } else {
        res.status(404)
          .json({
            message: 'Task with the supplied id does not exist'
          });
      }
    } catch(error) {
      next(error);
    }
  }
}
