//app.js

import express from 'express';
import router from './Modules/Auth/Route.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});