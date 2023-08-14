'use strict';

const { Sequelize } = require('sequelize');

// Define the database connection
const db = new Sequelize('app', '', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false,
});

module.exports = db;
