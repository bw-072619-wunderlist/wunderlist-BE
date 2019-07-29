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
}
