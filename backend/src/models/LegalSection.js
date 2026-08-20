const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LegalSection = sequelize.define('LegalSection', {
  section_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  act_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  section_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  section_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'legal_sections',
  timestamps: false,
});

module.exports = LegalSection;
