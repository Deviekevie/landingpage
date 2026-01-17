const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
    trim: true
  },
  category: {
    type: String,
    enum: ['first', 'second', 'third', 'ongoing', 'complete'],
    default: 'first'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  uploadedBy: {
    type: String,
    default: 'admin'
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
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
