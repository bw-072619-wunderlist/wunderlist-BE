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
}
