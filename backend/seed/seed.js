const { sequelize, Case, LegalIssue, LegalSection, CaseSection, Judgment, CaseJudgmentMatch, JudgmentSource } = require('../src/models');

const seedDatabase = async () => {
  try {
    console.log('--- Initializing Database Seeding ---');
    await sequelize.sync({ force: true });

    // 1. Create Sample Cases
    const sampleCase = await Case.create({
      case_id: 101,
      case_title: 'Property Dispute — Ananya Sundaram v. Rajeshwar Sundaram',
      case_type: 'Civil - Succession & Partition',
      jurisdiction: 'Madras High Court',
      case_facts: 'Daughter claims retroactive equal coparcenary rights in ancestral property where father passed away prior to 2005 amendment and brothers executed unilateral 2004 family settlement.',
    });

    // 2. Create Legal Issue
    await LegalIssue.create({
      issue_id: 1,
      case_id: 101,
      issue_text: "Daughter's Coparcenary Property Rights under amended Section 6 irrespective of father's survival on 09.09.2005",
    });

    // 3. Create Legal Section
    const sampleSection = await LegalSection.create({
      section_id: 1,
      act_name: 'Hindu Succession Act',
      section_number: 'Section 6',
      section_title: 'Devolution of interest in coparcenary property',
    });

    // 4. Link Case to Section
    await CaseSection.create({
      case_id: 101,
      section_id: 1,
    });

    // 5. Create Precedent Judgment
    await Judgment.create({
      judgment_id: 501,
      case_name: 'Vineeta Sharma v. Rakesh Sharma & Ors.',
      court: 'Supreme Court of India',
      date: '2020-08-11',
      citation: '(2020) 9 SCC 1',
      outcome: "Allowed (Daughter's equal coparcenary rights affirmed retrospectively by birth)",
    });

    // 6. Create Case-Judgment Match
    await CaseJudgmentMatch.create({
      match_id: 1,
      case_id: 101,
      judgment_id: 501,
      similarity_score: 94,
      rank_position: 1,
    });

    // 7. Create Judgment Source
    await JudgmentSource.create({
      source_id: 1,
      judgment_id: 501,
      source_name: 'Official Supreme Court Judgments Portal (SCI)',
      source_url: 'https://main.sci.gov.in/supremecourt/2018/32601/32601_2018_34_1501_23395_Judgement_11-Aug-2020.pdf',
      source_type: 'Official Government Law Report',
    });

    console.log('✔ Sample development legal data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✘ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
