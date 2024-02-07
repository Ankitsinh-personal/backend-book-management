import express from 'express';
import db from '../config/db.js';
import dotenv from "dotenv";
import router from './routes/index.js';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions =
{
  "origin": "http://localhost:4200",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}
app.use(cors(corsOptions));

//test connection
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to the database:', error))

// table created automatically
db.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.use(express.json());
app.use('/', router);

app.use((err, req, res, next) => {
  if (err instanceof Error && (err.message.includes('Unauthorized') || err.name === 'TokenExpiredError')) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log("server running on port:" + PORT);
});