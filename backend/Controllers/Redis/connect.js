import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
const redisPassword = process.env.REDIS_PASSWORD;

const redis = new Redis({
  port: redisPort,
  host: redisHost,
  password: redisPassword,
});  // Connecting to Redis

redis.on("connect", () => {
  console.log("Redis is connected");
});

export default redis;
