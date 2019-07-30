export default class ErrorHandler {
  static handleError(error, req, res, next) {
    if(error.code === '23505') {
      if(error.detail.includes('title')) {
        return res.status(400)
          .json({ message: 'Supplied title field already exists for the user' });
      }
      if(error.detail.includes('name')) {
        return res.status(400)
          .json({ message: 'Supplied name field already exists for the todo' });
      }
      if(error.detail.includes('completed_at')) {
        return res.status(400)
          .json({ message: 'history record cannot be duplicated' });
      }
      if(error.detail.includes('todo_id')) {
        return res.status(400)
          .json({ message: 'todo already shared with this user' });
      }
      if(error.detail.includes('username')) {
        return res.status(400)
          .json({ message: 'Supplied username field already exists' });
      }
      if(error.detail.includes('email')) {
        return res.status(400)
          .json({ message: 'Supplied email field already exists' });
      }
    }
    res.status(500)
      .json({
        error: 'Request failed, try again'
      });
  }
}
