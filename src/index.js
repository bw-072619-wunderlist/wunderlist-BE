import dotenv from 'dotenv';
import server from './resources/server';

dotenv.config(); // load .env variables

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`Server running on port:- ${port}`);
});
