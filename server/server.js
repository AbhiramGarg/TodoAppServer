import express from "express"
import { config } from "dotenv"
import { connectdb } from "./db/db.js"
import authRoutes from "./routes/auth.js"
import createRoute from "./routes/signup.js"
import taskRoute from "./routes/createtask.js"
import userRoute from "./routes/user.js"
import cors from "cors"
const app = express()
config()
app.use(express.json()) 
app.use(cors())
const port = process.env.PORT || 5500




app.listen(port,async() => {
    await connectdb()
    console.log(`Server running on port: ${port}`)
})

app.use('/auth',authRoutes)
app.use('/create',createRoute)
app.use('/',taskRoute)
app.use('/user',userRoute)