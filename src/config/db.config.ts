import env from 'dotenv'
import mongoose from 'mongoose'
env.config()



const dbConnection =async () => mongoose.connect(process.env.MONGO_DEV_URI as string,{
    dbName:'Radaar'
})
export default dbConnection