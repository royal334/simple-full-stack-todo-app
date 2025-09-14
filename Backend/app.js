import express from "express"
import { PORT, CORS_ORIGIN } from "./config/env.js"
import { connectDB } from "./database/mongodb.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.middleware.js"
import authRouter from "./routes/auth.route.js"
import todoRouter from "./routes/todos.route.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cors({
     origin: CORS_ORIGIN || 'http://localhost:5500',
     credentials: true
}))
app.use(cookieParser())
app.use(errorMiddleware)

app.use('/api/auth',authRouter)
app.use('/api', todoRouter)



app.listen(PORT, async () => {
     console.log(`Server is running on port ${PORT}`)
     await connectDB()
})