import cron from 'node-cron';
import { TodosModel as Todos } from '../resources/todos/TodosModel';

export default class Utilities {
  static startJobs() {
    cron.schedule('0 */6 * * *', async () => {
      try {
        await Todos.repeatTodos();
        await Todos.repeatTodos('weekly');
        await Todos.repeatTodos('monthly');

        await Todos.delete();
      } catch(error) {
        //silence
      }
    });
  }
}
