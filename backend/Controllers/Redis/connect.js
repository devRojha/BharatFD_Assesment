const redisClient = require("ioredis");

require("dotenv").config();

const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
const redisPassword = process.env.REDIS_PASSWORD;

const redis = new redisClient({
    port :  redisPort,
    host :  redisHost,
    password : redisPassword
});  // Conecting to redis

redis.on("connect", ()=>{
    console.log("redis is connected")
})

module.exports = redis