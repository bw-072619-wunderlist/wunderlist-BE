import { TasksModel as Tasks } from './TasksModel';

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
}
