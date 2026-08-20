const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CaseSection = sequelize.define('CaseSection', {
  case_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  section_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'case_sections',
  timestamps: false,
});

module.exports = CaseSection;
