import { UsersModel as Users } from './UsersModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'shuy&@iwhqGSYHW8213TEB57';

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
      const token = jwt.sign({...user[0]}, secret, { expiresIn: '1d' });
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
          const token = jwt.sign(user, secret, { expiresIn: '1d' });
          return res.status(200)
            .json({
              id: user.id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              notify: user.notify,
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

  static async resetAuthInfo(req, res, next) {
    try {
      const { email, newEmail, password, newPassword } = req.body;

      const user = await Users.read(email);
      if(user && user.email) {
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
          let changes = {
            password: newPassword? bcrypt.hashSync(newPassword, 12) : user.password,
            email: newEmail || email
          }
          changes = await Users.update(user.id, changes);

          return res.status(200)
            .json({
              id: changes[0].id,
              username: changes[0].username,
              email: changes[0].email,
              avatar: changes[0].avatar,
              notify: changes[0].notify
            });
        } else {
          return res.status(400)
            .json({
              message: 'Invalid credentials'
            });
        }
      }
    } catch(error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const users = await Users.read();
        res.status(200)
          .json(users);
    } catch(error) {
      next(error);
    }
  }
}
