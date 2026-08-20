const express = require('express');
const router = express.Router();
const legalSectionController = require('../controllers/legalSectionController');

router.get('/', legalSectionController.getLegalSections);
router.post('/', legalSectionController.createLegalSection);
router.get('/:sectionId', legalSectionController.getLegalSectionById);

module.exports = router;
