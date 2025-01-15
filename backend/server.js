import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"

import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoute.js"

const app = express()
const port = process.env.PORT || 4000
connectDB()

app.use(express.json())
app.use(cookieParser)
app.use(cors({ credentials: true }))

// API Endpoints
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => console.log(`server startd on PORT: ${port}`))