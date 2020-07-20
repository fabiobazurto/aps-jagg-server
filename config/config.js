// config
require('dotenv').config()

//Fragmento de base de datos
const dbConnect = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
}

module.exports = {
    "development":dbConnect,
    "production": dbConnect
  }

