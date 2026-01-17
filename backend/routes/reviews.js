const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');

// @route   GET /api/reviews
// @desc    Get all approved reviews
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(100);

    const stats = await Review.getAverageRating();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
      stats: stats
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/reviews
// @desc    Create a new review
// @access  Public
router.post('/', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot be more than 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ max: 1000 }).withMessage('Comment cannot be more than 1000 characters')
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

    const { name, email, rating, comment } = req.body;

    // Check for duplicate review (same email within last hour - prevent spam)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentReview = await Review.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: oneHourAgo }
    });

    if (recentReview) {
      return res.status(429).json({
        success: false,
        message: 'Please wait before submitting another review'
      });
    }

    // Create review
    const review = await Review.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
      status: 'approved' // Auto-approve for now (can be changed to 'pending' for moderation)
    });

    // Get updated stats
    const stats = await Review.getAverageRating();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review,
      stats: stats
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/reviews/stats
// @desc    Get review statistics
// @access  Public
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Review.getAverageRating();
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
