import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './database.js';

dotenv.config();

const port= process.env.PORT

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
      })
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error)
})
