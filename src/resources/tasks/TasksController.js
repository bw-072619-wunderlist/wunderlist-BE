import { TasksModel as Tasks } from './TasksModel';
import { isArray } from 'util';

export class TasksController {
  static async read(req, res, next) {
    try {
      const { id } = req.params;
      const tasks = id? await Tasks.readById(id) : await Tasks.read();
      if(isArray(tasks) && tasks.length > 0) {
        res.status(200)
          .json(tasks);
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

  static async update(req, res, next) {
    try {
      const updated = await Tasks.update(req.params.id, req.body);
      if(updated[0] && updated[0].name) {
        return res.status(200)
          .json({
            message: 'Successful task update',
            updated: updated[0]
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

  static async delete(req, res, next) {
    try {
      const deleted = await Tasks.delete(req.params.id);
      if(deleted[0] && deleted[0].name) {
        return res.status(200)
          .json({
            message: 'Successful task deletion',
            deleted: deleted[0]
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
