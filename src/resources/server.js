import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import UsersRoute from './users/UsersRoute';
import TodosRoute from './todos/TodosRoute';
import TasksRoute from './tasks/TasksRoute';
import ErrorHandler from '../helpers/ErrorHandler';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/v2/auths', UsersRoute);
server.use('/api/v2/todos', TodosRoute);
server.use('/api/v2/tasks', TasksRoute);
server.use(ErrorHandler.handleError);

export default server;
