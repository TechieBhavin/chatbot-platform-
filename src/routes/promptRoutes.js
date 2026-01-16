const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createPrompt,
  getPromptsByProject,
} = require('../controllers/promptController');

router.post('/projects/:projectId/prompts', protect, createPrompt);
router.get('/projects/:projectId/prompts', protect, getPromptsByProject);

module.exports = router;
