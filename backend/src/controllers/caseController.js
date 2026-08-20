const { Case, LegalIssue, LegalSection, CaseSection, CaseJudgmentMatch, Judgment, JudgmentSource } = require('../models');

// GET /api/cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.findAll({
      include: [
        { model: LegalIssue, as: 'legal_issues' },
        { model: LegalSection, as: 'sections', through: { attributes: [] } },
        { 
          model: CaseJudgmentMatch, 
          as: 'matches',
          include: [{ model: Judgment, as: 'judgment', include: [{ model: JudgmentSource, as: 'source' }] }] 
        }
      ]
    });
    return res.status(200).json(cases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/cases/:caseId
exports.getCaseById = async (req, res) => {
  try {
    const { caseId } = req.params;
    const foundCase = await Case.findByPk(caseId, {
      include: [
        { model: LegalIssue, as: 'legal_issues' },
        { model: LegalSection, as: 'sections', through: { attributes: [] } },
        { 
          model: CaseJudgmentMatch, 
          as: 'matches',
          include: [{ model: Judgment, as: 'judgment', include: [{ model: JudgmentSource, as: 'source' }] }] 
        }
      ]
    });

    if (!foundCase) {
      return res.status(404).json({ error: 'Case not found' });
    }

    return res.status(200).json(foundCase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/cases
exports.createCase = async (req, res) => {
  try {
    const { case_title, case_type, jurisdiction, case_facts } = req.body;
    
    if (!case_title || !case_type || !jurisdiction || !case_facts) {
      return res.status(400).json({ error: 'Missing required case fields (case_title, case_type, jurisdiction, case_facts)' });
    }

    const newCase = await Case.create({
      case_title,
      case_type,
      jurisdiction,
      case_facts,
    });

    return res.status(201).json(newCase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PUT /api/cases/:caseId
exports.updateCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const [updated] = await Case.update(req.body, { where: { case_id: caseId } });

    if (!updated) {
      return res.status(404).json({ error: 'Case not found for update' });
    }

    const updatedCase = await Case.findByPk(caseId);
    return res.status(200).json(updatedCase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cases/:caseId
exports.deleteCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const deleted = await Case.destroy({ where: { case_id: caseId } });

    if (!deleted) {
      return res.status(404).json({ error: 'Case not found for deletion' });
    }

    return res.status(200).json({ message: `Case ID ${caseId} deleted successfully` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/cases/:caseId/issues
exports.addLegalIssue = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { issue_text } = req.body;

    if (!issue_text) {
      return res.status(400).json({ error: 'issue_text is required' });
    }

    const parentCase = await Case.findByPk(caseId);
    if (!parentCase) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const newIssue = await LegalIssue.create({
      case_id: caseId,
      issue_text,
    });

    return res.status(201).json(newIssue);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/cases/:caseId/issues
exports.getLegalIssues = async (req, res) => {
  try {
    const { caseId } = req.params;
    const issues = await LegalIssue.findAll({ where: { case_id: caseId } });
    return res.status(200).json(issues);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/cases/:caseId/sections
exports.addCaseSection = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { section_id } = req.body;

    if (!section_id) {
      return res.status(400).json({ error: 'section_id is required' });
    }

    const [caseSec, created] = await CaseSection.findOrCreate({
      where: { case_id: caseId, section_id },
      defaults: { case_id: caseId, section_id }
    });

    return res.status(201).json({ message: 'Section linked to case', caseSec });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/cases/:caseId/sections
exports.getCaseSections = async (req, res) => {
  try {
    const { caseId } = req.params;
    const foundCase = await Case.findByPk(caseId, {
      include: [{ model: LegalSection, as: 'sections', through: { attributes: [] } }]
    });

    if (!foundCase) {
      return res.status(404).json({ error: 'Case not found' });
    }

    return res.status(200).json(foundCase.sections);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/cases/:caseId/matches
exports.addCaseMatch = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { judgment_id, similarity_score, rank_position } = req.body;

    if (!judgment_id || similarity_score === undefined || rank_position === undefined) {
      return res.status(400).json({ error: 'judgment_id, similarity_score, and rank_position are required' });
    }

    const match = await CaseJudgmentMatch.create({
      case_id: caseId,
      judgment_id,
      similarity_score,
      rank_position,
    });

    return res.status(201).json(match);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/cases/:caseId/matches
exports.getCaseMatches = async (req, res) => {
  try {
    const { caseId } = req.params;
    const matches = await CaseJudgmentMatch.findAll({
      where: { case_id: caseId },
      include: [{ model: Judgment, as: 'judgment', include: [{ model: JudgmentSource, as: 'source' }] }],
      order: [['similarity_score', 'DESC']]
    });

    return res.status(200).json(matches);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
