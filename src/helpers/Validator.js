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
}
