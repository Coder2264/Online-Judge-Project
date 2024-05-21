import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//routes
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import submissionRouter from './routes/submission.routes.js';
import testcaseRouter from './routes/testcase.routes.js';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


//using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/submissions', submissionRouter);
app.use('/api/v1/testcases', testcaseRouter);

// app.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//         success: false,
//         message: err.message,
//     });
// });



export default app;