const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JudgmentSource = sequelize.define('JudgmentSource', {
  source_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  judgment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  source_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  source_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'judgment_sources',
  timestamps: false,
});

module.exports = JudgmentSource;
