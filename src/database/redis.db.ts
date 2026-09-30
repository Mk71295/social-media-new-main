import { createClient } from "redis"
import dotenv, { config } from "dotenv"
dotenv.config();
export const redisClient = createClient({
  url: process.env.REDIS_URL as string || "rediss://default:gQAAAAAABOJBAAIgcDI3ZWFiMmRiZjAxMjM0MzhkYTBlNWY2NDc3MzM0MmM4MQ@evident-moose-320065.upstash.io:6379"
});

redisClient.on("error", function (failure) {
  throw failure;
});

export const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log("✅ REDIS CONNECTION SCCUESSFULLY !")
  } catch (caughtError) {
    console.log(`❌ ERROR IN REDIS CONNECTION : `, caughtError)
  }
}
