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

server.get('/', (req, res) => {
  res.status(200)
    .json('Welcome! WunderList 2.0 API Service..');
});

server.use('/api/v2', UsersRoute);
server.use('/api/v2/todos', TodosRoute);
server.use('/api/v2/tasks', TasksRoute);
server.use(ErrorHandler.handleError);

export default server;
