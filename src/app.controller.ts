import express from "express"
import dotenv, { config } from "dotenv"
import { connectMongo } from "./database/mongo.db.js"
import {connectRedis } from "./database/redis.db.js"
import authRoutes from "./module/auth/auth.routing.js"
import userRoutes from "./module/user/user.routing.js"
import postRoutes from "./module/post/post.routing.js"

export const createServer = () => {

    dotenv.config();
    connectMongo()
    connectRedis()
    const server = express()

    server.use(express.json())
    server.use("/auth",authRoutes)
    server.use("/user",userRoutes)
    server.use("/post",postRoutes)
    return server
}
export default createServer
