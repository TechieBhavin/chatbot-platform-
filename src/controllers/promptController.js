const Prompt = require('../models/Prompt');
const Project = require('../models/Project');

/**
 * @desc    Create prompt under a project
 * @route   POST /api/projects/:projectId/prompts
 * @access  Private
 */
exports.createPrompt = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { projectId } = req.params;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Check project ownership
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const prompt = await Prompt.create({
      project: projectId,
      title,
      content,
    });

    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get prompts for a project
 * @route   GET /api/projects/:projectId/prompts
 * @access  Private
 */
exports.getPromptsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Ensure project belongs to user
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const prompts = await Prompt.find({ project: projectId });
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
