require('dotenv').config();

const config = {
    dbName: process.env.MONGO_DB_NAME,
    dbUrl: process.env.MONGO_URL,
    jwtSectret: process.env.JWT_SECRET,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
}

module.exports = { config };