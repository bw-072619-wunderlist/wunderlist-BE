import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'shuy&@iwhqGSYHW8213TEB57';

export class Auths {
  static authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
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
