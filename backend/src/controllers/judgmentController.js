const { Judgment, JudgmentSource } = require('../models');

// GET /api/judgments
exports.getJudgments = async (req, res) => {
  try {
    const judgments = await Judgment.findAll({
      include: [{ model: JudgmentSource, as: 'source' }]
    });
    return res.status(200).json(judgments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/judgments/:judgmentId
exports.getJudgmentById = async (req, res) => {
  try {
    const { judgmentId } = req.params;
    const judgment = await Judgment.findByPk(judgmentId, {
      include: [{ model: JudgmentSource, as: 'source' }]
    });

    if (!judgment) {
      return res.status(404).json({ error: 'Judgment not found' });
    }

    return res.status(200).json(judgment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/judgments
exports.createJudgment = async (req, res) => {
  try {
    const { case_name, court, date, citation, outcome } = req.body;

    if (!case_name || !court || !date || !citation || !outcome) {
      return res.status(400).json({ error: 'Missing required judgment fields' });
    }

    const newJudgment = await Judgment.create({
      case_name,
      court,
      date,
      citation,
      outcome,
    });

    return res.status(201).json(newJudgment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/judgments/:judgmentId/source
exports.setJudgmentSource = async (req, res) => {
  try {
    const { judgmentId } = req.params;
    const { source_name, source_url, source_type } = req.body;

    if (!source_name || !source_url || !source_type) {
      return res.status(400).json({ error: 'source_name, source_url, and source_type are required' });
    }

    const [source, created] = await JudgmentSource.findOrCreate({
      where: { judgment_id: judgmentId },
      defaults: {
        judgment_id: judgmentId,
        source_name,
        source_url,
        source_type,
      }
    });

    if (!created) {
      await source.update({ source_name, source_url, source_type });
    }

    return res.status(201).json(source);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/judgments/:judgmentId/source
exports.getJudgmentSource = async (req, res) => {
  try {
    const { judgmentId } = req.params;
    const source = await JudgmentSource.findOne({ where: { judgment_id: judgmentId } });

    if (!source) {
      return res.status(404).json({ error: 'Source not found for this judgment' });
    }

    return res.status(200).json(source);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
