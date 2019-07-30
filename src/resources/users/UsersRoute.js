import express from 'express';
import { Validator } from '../../helpers/Validator';
import { UsersController as Users } from './UsersController';

const router = express.Router();

router.post('/register', Validator.validateUser, Users.register);
router.post('/login', Users.login);

export default router;
