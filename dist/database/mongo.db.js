import mongoose from "mongoose";
export const connectMongo = async () => {
    const mongoUrl = process.env.DATABASE_URL;
    try {
        await mongoose.connect(mongoUrl, {
            maxPoolSize: process.env.MAX_POOL,
            serverSelectionTimeoutMS: process.env.SERVER_TIMEOUT
        });
        console.log("✅ STATUS IN DATABASE MONGOOSE : PASSED ");
    }
    catch (dbFailure) {
        console.log("❌ ERROR IN DATABASE : ", dbFailure);
    }
};
