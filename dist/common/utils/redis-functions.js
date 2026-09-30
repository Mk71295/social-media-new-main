import { redisClient } from "../../database/redis.db.js";
export const otpKeyFor = (emailAddr) => {
    return `otp:${emailAddr}`;
};
export const cacheSet = async (cacheKey, cacheValue, ttlSeconds) => {
    return ttlSeconds ? await redisClient.set(cacheKey, JSON.stringify(cacheValue), { EX: ttlSeconds }) : await redisClient.set(cacheKey, JSON.stringify(cacheValue));
};
export const cacheGet = async (cacheKey) => {
    const cached = await redisClient.get(cacheKey);
    return cached ? JSON.parse(cached) : null;
};
export const cacheRemove = async (cacheKey) => {
    return await redisClient.del(cacheKey);
};
export const cacheHas = async (cacheKey) => {
    return await redisClient.exists(cacheKey);
};
export const cacheClear = async () => {
    return await redisClient.flushAll();
};
