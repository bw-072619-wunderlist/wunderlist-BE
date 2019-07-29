import { UsersModel as Users } from './UsersModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UsersController {
  static register = async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = await Users.create({
        ...req.body,
        password: hashedPassword
      });
      if(user && user.email) {
        const token = jwt.sign(user, 'WUE6nnw#j83-UWNJWGfsuj#*h', { expiresIn: '1d' });
        return res.status(201)
          .json({
            ...user,
            token
          });
      }
    } catch(error) {
      next(error);
    }
  }

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await Users.read(email);
      if(user && user.email) {
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
          const token = jwt.sign(user, 'WUE6nnw#j83-UWNJWGfsuj#*h', { expiresIn: '1d' });
          return res.status(201)
            .json({
              ...user,
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