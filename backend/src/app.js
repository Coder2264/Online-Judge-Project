import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: '*',
  credentials: true
}));


//routes
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import submissionRouter from './routes/submission.routes.js';
import testcaseRouter from './routes/testcase.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/submissions', submissionRouter);
app.use('/api/v1/testcases', testcaseRouter);


export default app;