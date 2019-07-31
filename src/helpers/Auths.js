import jwt from 'jsonwebtoken';

export class Auths {
  static authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
      jwt.verify(token, 'WUE6nnw#j83-UWNJWGfsuj#*h', (err, decoded) => {
        if (err) return res.status(401).json({
          message: 'User not authenticated'
        });

        req.user = decoded;

        next();
      });
    } else {
      return res.status(401).json({
        error: 'No token provided, must be set on the Authorization Header',
      });
    }
  }
}
