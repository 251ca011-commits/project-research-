const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Case = sequelize.define('Case', {
  case_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  case_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  case_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jurisdiction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  case_facts: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'cases',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Case;
