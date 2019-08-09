import express from 'express';
import { Validator } from '../../helpers/Validator';
import { UsersController as Users } from './UsersController';
import { Auths } from '../../helpers/Auths';

const router = express.Router();

router.post('/auths/register', Validator.validateUser, Users.register);
router.post('/auths/login', Users.login);
router.put('/auths/reset', Users.update);

router.get('/users', Auths.authenticate, Users.read);
router.put('/users', Auths.authenticate, Users.update);

export default router;
