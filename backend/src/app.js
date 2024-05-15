import express from 'express';
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res)=> {
  res.send('Homepage')
})

//routes
import userRouter from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);




export default app;