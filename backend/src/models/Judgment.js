const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Judgment = sequelize.define('Judgment', {
  judgment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  case_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  court: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  citation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  outcome: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'judgments',
  timestamps: false,
});

module.exports = Judgment;
