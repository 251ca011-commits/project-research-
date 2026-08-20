const { LegalSection, Case } = require('../models');

// GET /api/legal-sections
exports.getLegalSections = async (req, res) => {
  try {
    const sections = await LegalSection.findAll({
      include: [{ model: Case, as: 'cases', through: { attributes: [] } }]
    });
    return res.status(200).json(sections);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/legal-sections/:sectionId
exports.getLegalSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await LegalSection.findByPk(sectionId, {
      include: [{ model: Case, as: 'cases', through: { attributes: [] } }]
    });

    if (!section) {
      return res.status(404).json({ error: 'Legal Section not found' });
    }

    return res.status(200).json(section);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/legal-sections
exports.createLegalSection = async (req, res) => {
  try {
    const { act_name, section_number, section_title } = req.body;

    if (!act_name || !section_number || !section_title) {
      return res.status(400).json({ error: 'act_name, section_number, and section_title are required' });
    }

    const section = await LegalSection.create({
      act_name,
      section_number,
      section_title,
    });

    return res.status(201).json(section);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
