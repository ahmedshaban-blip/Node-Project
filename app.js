import express from 'express';
import cookieParser from 'cookie-parser';
import PRouter from './Modules/Auth/postRoute.js';
import authRouter from './Modules/Auth/Route.js';
import commentsRouter from './Modules/Comments/Route.js';
import uploadRouter from './Modules/Uploads/Route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// علشان تخلي الصور اللى هتتخزت متاحة بالurl 
app.use("/uploads", express.static("uploads"));

app.use('/posts', PRouter);
app.use('/auth', authRouter);
app.use('/api', commentsRouter);
app.use('/files', uploadRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
