import express from "express"
import { PORT } from "./config/env.js"
import { connectDB } from "./database/mongodb.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.middleware.js"
import authRouter from "./routes/auth.route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser())
app.use(errorMiddleware)

app.use('/api/auth',authRouter)



app.listen(PORT, async () => {
     console.log(`Server is running on port ${PORT}`)
     await connectDB()
})