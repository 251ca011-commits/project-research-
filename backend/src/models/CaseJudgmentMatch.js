const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CaseJudgmentMatch = sequelize.define('CaseJudgmentMatch', {
  match_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  case_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  judgment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  similarity_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  rank_position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'case_judgment_matches',
  timestamps: false,
});

module.exports = CaseJudgmentMatch;
