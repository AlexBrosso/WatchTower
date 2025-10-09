const { createClient } = require("redis");
require("dotenv").config();

const redis = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    legacyMode: true
});

redis.connect().then(() => console.log("Redis Connected!")).catch(err => console.error("Error trying to connect to redis!"))

redis.on("error", (err) => console.error("Redis error: ", err));

module.exports = redis;