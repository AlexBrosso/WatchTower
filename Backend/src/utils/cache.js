const { getRedisClient } = require("../services/redisClient");

async function setCache(key, value, ttlSeconds) {
  const redis = await getRedisClient();
  if (!redis){
       console.warn(`SET Cache for key: ${key} without Redis Service`);
       return null;
  }

  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
  console.log(`Cache SET: ${key} TTL: ${ttlSeconds}s`);
}

async function getCache(key) {
  const redis = await getRedisClient();
  if (!redis){
       console.warn(`GET Cache for key: ${key} without Redis Service`);
       return null;
  }

  const value = await redis.get(key);
  if (value) {
    console.log(`Cache HIT: ${key}`);
    return JSON.parse(value);
  }
  console.log(`Cache MISS: ${key}`);
  return null;
}

function secondsUntilTomorrow(){
    const now = new Date();
    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
    );

    return Math.max( Math.floor((tomorrow - now) / 1000), 30);
}

function secondsUntilNextSunday(){
    const now = new Date();
    const today = now.getDay();
    const daysUntilSunday = today === 0 ? 7 : (7 - today) % 7;
    const nextSunday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + daysUntilSunday,
        0, 0, 0
    );
    
    return Math.max( Math.floor((nextSunday - now) / 1000), 30);
}

module.exports = { setCache, getCache, secondsUntilTomorrow, secondsUntilNextSunday }