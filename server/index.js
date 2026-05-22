import express from 'express';
import connectDb from './db/connect.js';
import userRoutes from './route/user.js';

const app = express();

app.use(express.json());
app.use('/', userRoutes);

const port = 8000;
connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});