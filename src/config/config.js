require('dotenv').config();

const config = {
    dbName: process.env.MONGO_DB_NAME,
    dbUrl: process.env.MONGO_URL,
}

module.exports = { config };