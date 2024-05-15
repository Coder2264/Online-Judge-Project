import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}
))

app.get('/', (req,res)=> {
  res.send('Homepage')
})

//routes
import userRouter from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);




export default app;