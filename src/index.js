import dotenv from 'dotenv';
import server from './resources/server';
import utilities from './helpers/Utilities';

dotenv.config();
utilities.startJobs();

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port:- ${port}`);
});
