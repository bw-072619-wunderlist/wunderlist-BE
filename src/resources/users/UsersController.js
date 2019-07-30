import { UsersModel as Users } from './UsersModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UsersController {
  static async register(req, res, next) {
    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = await Users.create({
        ...req.body,
        password: hashedPassword
      });
      delete user[0].password;
      const token = jwt.sign({...user[0]}, 'WUE6nnw#j83-UWNJWGfsuj#*h', { expiresIn: '1d' });
      return res.status(201)
        .json({
          ...user[0],
          token
        });
    } catch(error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
  
      const user = await Users.read(email);
      if(user && user.email) {
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
          const token = jwt.sign(user, 'WUE6nnw#j83-UWNJWGfsuj#*h', { expiresIn: '1d' });
          return res.status(201)
            .json({
              id: user.id,
              username: user.username,
              email: user.email,
              token
            });
        } else {
          return res.status(400)
            .json({
              message: 'Invalid login credentials'
            });
        }
      } else {
        return res.status(400)
          .json({
            message: 'Invalid login credentials'
          });
      }
    } catch(error) {
      next(error);
    }
  }
}
