import { isArray } from "util";

export class Validator {
  static validateId = (req, res, next) => {
    const { id } = req.params;
    if(!Number.isInteger(id) || Number.parseInt(id, 10) <= 0) {
      return res.status(400)
        .json({
          message: 'Invalid id in URL'
        });
    }
    next();
  }

  static validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    if(!username || username.trim() === '') {
      return res.status(400)
        .json({
          message: 'Missing required username field'
        });
    }
    if(!email || email.trim() === '') {
      return res.status(400)
        .json({
          message: 'Missing required email field'
        });
    }
    if(!RegExp(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/).test(email)) {
      return res.status(400)
        .json({
          message: 'Invalid value for email field'
        });
    }
    if(!password || password.trim() === '') {
      return res.status(400)
        .json({
          message: 'Missing required password field'
        });
    }
    next();
  }

  static validateTaskObject = (task) => {
    if(!task.name || task.name.trim() === '') {
      return {
        pass: false,
        message: 'Missing required task name field'
      }
    }
    if(task.notes) {
      if(task.notes.trim() === '') {
        return {
          pass: false,
          message: 'Missing required notes name field'
        }
      }
    }
    if(task.completed) {
      if(task.completed !== true && task.completed !== false) {
        return {
          pass: false,
          message: 'completed field can only hold boolean value'
        }
      }
    }
    return {
      pass: true
    };
  }

  static validateTodo = (req, res, next) => {
    const { title, description, completed, scheduled_at, repeat, deleted, tasks } = req.body;
    if(!title || title.trim() === '') {
      return res.status(400)
        .json({
          message: 'Missing required title field'
        });
    }
    if(description) {
      if(description.trim() === '') {
        return res.status(400)
          .json({
            message: 'description field cannot be empty'
          });
      }
    }
    if(completed) {
      if(completed !== true && completed !== false) {
        return res.status(400)
          .json({
            message: 'completed field can only hold boolean value'
          });
      }
    }
    if(deleted) {
      if(deleted !== true && deleted !== false) {
        return res.status(400)
          .json({
            message: 'deleted field can only hold boolean value'
          });
      }
    }
    if(scheduled_at) {
      if(!RegExp(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?$/).test(scheduled_at)) {
        return res.status(400)
          .json({
            message: 'Invalid value for scheduled_at field'
          });
      }
    }
    if(repeat) {
      if(!['no-repeat', 'daily', 'weekly', 'monthly'].includes(repeat.toLowerCase())) {
        return res.status(400)
          .json({
            message: 'Invalid value for repeat field'
          });
      }
    }
    if(!Array.isArray(tasks) || tasks.length < 1) {
      return res.status(400)
        .json({
          message: 'tasks field cannot be empty list'
        });
    }
    for(let i = 0; i < tasks.length; i++) {
      const check = Validator.validateTaskObject(tasks[i]);
      if(!check.pass) {
        return res.status(400)
          .json({
            message: check.message
          });
      }
    }
    next();
  }

  static validateTasks = (req, res, next) => {
    const tasks = [...req.body];
    if(!Array.isArray(tasks) || tasks.length < 1) {
      return res.status(400)
        .json({
          message: 'tasks cannot be empty list'
        });
    }
    for(let i = 0; i < tasks.length; i++) {
      const check = Validator.validateTaskObject(tasks[i]);
      if(!check.pass) {
        return res.status(400)
          .json({
            message: check.message
          });
      }
    }
    next();
  }
}
