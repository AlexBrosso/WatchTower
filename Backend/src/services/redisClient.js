const { createClient } = require("redis");
require("dotenv").config();

let redis;
let redisConnected = false;

async function createRedisClient() {
    redis = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
        socket: {
            reconnectStrategy: 30000
        }
    });

    redis.on("connect", () => {
                redisConnected = true;
                console.log("Redis Connected!");
            });
    redis.on("ready", () => console.log("Redis Ready to use."));
    redis.on("end", () => console.warn("Redis Connection closed."));
    redis.on("reconnecting", () => console.log(" Attempting to reconnect to Redis..."));
    redis.on("error", (err) => {
          if (redisConnected) {
            console.error("Redis error:", err.message);
            redisConnected = false;
          }
          else {
            console.log("Redis still offline, waiting...");
          }
        });

    try{
        await redis.connect();
    } catch (err){
        console.error("Failed to connect to Redis. Cache will be temporarily disabled - " + err.message);
        redis = null;
    }

    return redis;
}

async function getRedisClient() {
  if (!redisConnected) {
    console.warn('Redis client not connected. Returning null client.');
    return null;
  }
  return redis;
}

module.exports = { createRedisClient, getRedisClient };