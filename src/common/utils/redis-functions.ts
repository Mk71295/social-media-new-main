import { redisClient } from "../../database/redis.db.js"

export const otpKeyFor=(emailAddr:string):string=>{
    return `otp:${emailAddr}`
}

export const cacheSet = async (cacheKey:string, cacheValue:unknown, ttlSeconds?:number) => {
    return ttlSeconds ? await redisClient.set(cacheKey, JSON.stringify(cacheValue), { EX: ttlSeconds }) : await redisClient.set(cacheKey, JSON.stringify(cacheValue))
}

export const cacheGet = async (cacheKey:string):Promise<unknown|null> => {
    const cached = await redisClient.get(cacheKey);

    return cached ? JSON.parse(cached) : null;
}

export const cacheRemove = async (cacheKey:string):Promise<unknown> => {
    return await redisClient.del(cacheKey)
}

export const cacheHas = async (cacheKey:string):Promise<unknown> => {
    return await redisClient.exists(cacheKey)
}

export const cacheClear = async ():Promise<unknown> => {
    return await redisClient.flushAll()
}
