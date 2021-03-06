import express from 'express';
import { Validator } from '../../helpers/Validator';
import { Auths } from '../../helpers/Auths';
import { TodosController as Todos } from './TodosController';

const router = express.Router();

router.post('/', Auths.authenticate, Validator.validateTodo, Todos.create);
router.get('/', Auths.authenticate, Todos.read);
router.use('/:id', Validator.validateId);

router.post('/:id/tasks', Auths.authenticate, Validator.validateTasks, Todos.addTodoTask);
router.get('/:id', Auths.authenticate, Todos.read);
router.put('/:id', Auths.authenticate, Validator.validateTodo, Todos.update);
router.put('/:id/users/:user_id', Auths.authenticate, Todos.shareTodo);
router.delete('/:id', Auths.authenticate, Todos.delete);

export default router;
