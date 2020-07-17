// config
require('dotenv').config()

//Fragmento de base de datos
const dbConnect = {
    "username": "root",
    "password": "kame123+",
    "database": "jagg_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
}

module.exports = {
    "development":dbConnect,
    "production": dbConnect
  }

