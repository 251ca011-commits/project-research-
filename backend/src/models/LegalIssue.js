const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LegalIssue = sequelize.define('LegalIssue', {
  issue_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  case_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  issue_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'legal_issues',
  timestamps: false,
});

module.exports = LegalIssue;
