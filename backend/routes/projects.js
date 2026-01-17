const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/projects
// @desc    Get all active projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({ status: 'active' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/projects
// @desc    Create a new project (admin only)
// @access  Private/Admin
router.post('/', [
  protect,
  authorize('admin'),
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot be more than 200 characters'),
  body('imageUrl')
    .trim()
    .notEmpty().withMessage('Image URL is required')
    .isURL().withMessage('Please provide a valid image URL'),
  body('category')
    .optional()
    .isIn(['first', 'second', 'third', 'ongoing', 'complete']).withMessage('Invalid category'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description cannot be more than 1000 characters')
], async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, imageUrl, category } = req.body;

    // Create project
    const project = await Project.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      imageUrl: imageUrl.trim(),
      category: category || 'first',
      uploadedBy: req.user.email || 'admin'
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
