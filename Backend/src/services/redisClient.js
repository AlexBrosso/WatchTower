const { createClient } = require("redis");
require("dotenv").config();

let redis;
let redisConnected = false;
let redisConnectionProcessStarted = false;

async function createRedisClient() {
  if(!redisConnectionProcessStarted){
    redisConnectionProcessStarted = true;
    redis = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
        socket: {
            reconnectStrategy: (retries) => {
              Math.min(retries * 2500, 30000);
            }
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

    try {
      await redis.connect();
    } catch (err) {
      console.error("Failed to connect to Redis. Cache will be temporarily disabled - " + err.message);
      redis = null;
    } finally {
      redisConnectionProcessStarted = false; // sempre libera o processo
    }

    return redis;
  }
}

async function getRedisClient() {
  if (!redisConnected) {
    if(!await isRedisAlive(redis)){
      createRedisClient();
      console.warn('Redis client is not initiliazed yet. Tryng start the service and for now returning null client.');
    }
    else console.warn('Redis client not connected. Returning null client.');
    return null;
  }
  return redis;
}

async function isRedisAlive(client, timeoutMs = 1500) {
  if (!client) return false;

  const pingPromise = client.ping();
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Redis ping timeout")), timeoutMs)
  );

  try {
    const res = await Promise.race([pingPromise, timeoutPromise]);
    return res === "PONG";
  } catch {
    return false;
  }
}

module.exports = { createRedisClient, getRedisClient };