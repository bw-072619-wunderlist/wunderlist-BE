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
    const { email, password } = req.body;
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
}
