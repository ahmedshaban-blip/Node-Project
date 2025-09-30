import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './Modules/Auth/Route.js';
import commentsRouter from './Modules/Comments/Route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/api', commentsRouter);   

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
