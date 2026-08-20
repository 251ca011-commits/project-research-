const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// Case CRUD
router.get('/', caseController.getCases);
router.post('/', caseController.createCase);
router.get('/:caseId', caseController.getCaseById);
router.put('/:caseId', caseController.updateCase);
router.delete('/:caseId', caseController.deleteCase);

// Legal Issues for Case
router.post('/:caseId/issues', caseController.addLegalIssue);
router.get('/:caseId/issues', caseController.getLegalIssues);

// Legal Sections for Case
router.post('/:caseId/sections', caseController.addCaseSection);
router.get('/:caseId/sections', caseController.getCaseSections);

// Precedent Matches for Case
router.post('/:caseId/matches', caseController.addCaseMatch);
router.get('/:caseId/matches', caseController.getCaseMatches);

module.exports = router;
