<<<<<<< HEAD
const { Sequelize } = require("sequelize");
require("dotenv").config();
=======
const { Sequelize } = require('sequelize');
require('dotenv').config();
>>>>>>> upstream/main

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
<<<<<<< HEAD
    dialect: "postgres",
    logging: false,
=======
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
>>>>>>> upstream/main
  }
);

module.exports = sequelize;