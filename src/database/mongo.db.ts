import mongoose from "mongoose"

export const connectMongo = async()=>{
    const mongoUrl = process.env.DATABASE_URL as string
    try{
        await mongoose.connect(mongoUrl,{
            maxPoolSize:process.env.MAX_POOL as unknown as number,
            serverSelectionTimeoutMS:process.env.SERVER_TIMEOUT as unknown as number
        })
        console.log("✅ STATUS IN DATABASE MONGOOSE : PASSED ")
    }
    catch(dbFailure){
        console.log("❌ ERROR IN DATABASE : ",dbFailure)
    }
}
