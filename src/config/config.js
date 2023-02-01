require('dotenv').config();

const config = {
    dbName: process.env.MONGO_DB_NAME,
    dbUrl: process.env.MONGO_URL,
    jwtSectret: process.env.JWT_SECRET,
}

module.exports = { config };