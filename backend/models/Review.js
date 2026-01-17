const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
ReviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating (static method)
ReviewSchema.statics.getAverageRating = async function() {
  const obj = await this.aggregate([
    {
      $match: { status: 'approved' }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    return {
      averageRating: obj[0] ? parseFloat(obj[0].averageRating.toFixed(2)) : 0,
      totalReviews: obj[0] ? obj[0].totalReviews : 0
    };
  } catch (err) {
    console.error('Error calculating average rating:', err);
    return { averageRating: 0, totalReviews: 0 };
  }
};

module.exports = mongoose.model('Review', ReviewSchema);
