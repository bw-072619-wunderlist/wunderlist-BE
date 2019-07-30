import express from 'express';
import { Validator } from '../../helpers/Validator';
import { Auths } from '../../helpers/Auths';
import { TasksController as Tasks } from './TasksController';

const router = express.Router();

router.get('/', Auths.authenticate, Tasks.read);
router.use(Validator.validateId);

router.get('/:id', Auths.authenticate, Tasks.read);
router.put('/:id', Auths.authenticate, Validator.validateTask, Tasks.update);
router.delete('/:id', Auths.authenticate, Tasks.delete);

export default router;
