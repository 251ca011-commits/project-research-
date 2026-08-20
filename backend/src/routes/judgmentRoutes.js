const express = require('express');
const router = express.Router();
const judgmentController = require('../controllers/judgmentController');

// Judgment CRUD
router.get('/', judgmentController.getJudgments);
router.post('/', judgmentController.createJudgment);
router.get('/:judgmentId', judgmentController.getJudgmentById);

// Judgment Official Source
router.post('/:judgmentId/source', judgmentController.setJudgmentSource);
router.get('/:judgmentId/source', judgmentController.getJudgmentSource);

module.exports = router;
