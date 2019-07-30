import { TasksModel as Tasks } from './TasksModel';
import { isArray } from 'util';

export class TasksController {
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
        return res.status(200)
          .json({
            message: 'Successful task update',
            updated
          });
      }
      res.status(404)
        .json({
          message: 'Task with the supplied id does not exist'
        });
    } catch(error) {
      next(error);
    }
  }

  static delete = async (req, res, next) => {
    try {
      const deleted = await Tasks.delete(req.params.id);
      if(deleted && deleted.name) {
        return res.status(200)
          .json({
            message: 'Successful task deletion',
            deleted
          });
      }
      res.status(404)
        .json({
          message: 'Task with the supplied id does not exist'
        });
    } catch(error) {
      next(error);
    }
  }
}
