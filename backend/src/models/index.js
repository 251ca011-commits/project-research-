const sequelize = require('../config/database');
const Case = require('./Case');
const LegalIssue = require('./LegalIssue');
const LegalSection = require('./LegalSection');
const CaseSection = require('./CaseSection');
const Judgment = require('./Judgment');
const CaseJudgmentMatch = require('./CaseJudgmentMatch');
const JudgmentSource = require('./JudgmentSource');

// 1. CASE <-> LEGAL_ISSUE (1 : N)
Case.hasMany(LegalIssue, { foreignKey: 'case_id', as: 'legal_issues', onDelete: 'CASCADE' });
LegalIssue.belongsTo(Case, { foreignKey: 'case_id', as: 'case' });

// 2. CASE <-> LEGAL_SECTION (M : N via CaseSection)
Case.belongsToMany(LegalSection, { through: CaseSection, foreignKey: 'case_id', otherKey: 'section_id', as: 'sections' });
LegalSection.belongsToMany(Case, { through: CaseSection, foreignKey: 'section_id', otherKey: 'case_id', as: 'cases' });

// 3. CASE <-> CASE_JUDGMENT_MATCH <-> JUDGMENT
Case.hasMany(CaseJudgmentMatch, { foreignKey: 'case_id', as: 'matches', onDelete: 'CASCADE' });
CaseJudgmentMatch.belongsTo(Case, { foreignKey: 'case_id', as: 'case' });

Judgment.hasMany(CaseJudgmentMatch, { foreignKey: 'judgment_id', as: 'matches', onDelete: 'CASCADE' });
CaseJudgmentMatch.belongsTo(Judgment, { foreignKey: 'judgment_id', as: 'judgment' });

// 4. JUDGMENT <-> JUDGMENT_SOURCE (1 : 1 / 1 : N)
Judgment.hasOne(JudgmentSource, { foreignKey: 'judgment_id', as: 'source', onDelete: 'CASCADE' });
JudgmentSource.belongsTo(Judgment, { foreignKey: 'judgment_id', as: 'judgment' });

module.exports = {
  sequelize,
  Case,
  LegalIssue,
  LegalSection,
  CaseSection,
  Judgment,
  CaseJudgmentMatch,
  JudgmentSource,
};
