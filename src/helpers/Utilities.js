import cron from 'node-cron';
import { TodosModel as Todos } from '../resources/todos/TodosModel';
import { UsersModel as Users } from '../resources/users/UsersModel';
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

    cron.schedule('0 * * * *', async () => {
      try {
        const usersInfo = await Users.getNotificationsInfo();
        if(usersInfo && usersInfo.length > 0) {
          usersInfo.forEach(userInfo => {
            Utilities.sendMessage({
              email: userInfo.email,
              subject: `Todo Reminder for ${userInfo.username.toUpperCase()}`,
              text: `${userInfo.title}, is due for your action... Keep it rolling!`
            });
          });
        }
      } catch(error) {
        //silence
      }
    });
  }

  static sendMessage(info) {
    const msgConfig = {
      from: "WunderList 2.0 - wunderlistv2@gmail.com",
      to: info.email,
      subject: info.subject,
      text: info.text,
    };
    transporter.sendMail(msgConfig, (error, info) => {
        // Silence
    });
  }
}
