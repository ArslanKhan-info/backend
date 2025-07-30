import express from "express";
import env from 'dotenv'
import dbConnection from "./config/db.config";
import mainRoute from "./routes/index";

env.config()

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(process.env.API_PREFIX || '/api', mainRoute)

const startServer =async () => {
    try {
        await dbConnection();
        server.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on ${process.env.PORT}`);
        });

    } catch (err) {
        console.error('Error while starting server=>', err)
    }
}

startServer()
