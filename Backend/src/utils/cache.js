const redis = require("../services/redisClient");

async function setCache(key, data, ttlSeconds = 60) {
    const value = JSON.stringify(data);
    await redis.set(key, value, { EX: ttlSeconds });
}

async function getCache(key){
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
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