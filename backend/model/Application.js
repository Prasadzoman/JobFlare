const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Invalid email address']
  },
  phone: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  linkedIn: {
    type: String
  },
  resumeUrl: {
    type: String,
    required: true
  },
  expectedSalary: {
    type: String
  },
  startDate: {
    type: Date
  },
  workAuthorization: {
    type: Boolean,
    default: false
  },
  relocate: {
    type: Boolean,
    default: false
  },
  experience: {
    type: Number,
    min: 0
  },
  skills: [String],
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application
