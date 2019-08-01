import cron from 'node-cron';
import { TodosModel as Todos } from '../resources/todos/TodosModel';
import mailer from 'nodemailer';

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "wunderlistv2@gmail.com",
    pass: "09063912145"
  }
});

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
