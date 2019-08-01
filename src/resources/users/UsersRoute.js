import express from 'express';
import { Validator } from '../../helpers/Validator';
import { UsersController as Users } from './UsersController';
import { Auths } from '../../helpers/Auths';

const router = express.Router();

router.post('/register', Validator.validateUser, Users.register);
router.post('/login', Users.login);
router.get('/users', Auths.authenticate, Users.read);

export default router;
