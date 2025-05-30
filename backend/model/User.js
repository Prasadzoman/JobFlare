const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['applicant', 'recruiter'],
    default: 'applicant'
  },
  phone: {
    type: String
  },
  resumeUrl: {
    type: String
  },
  skills: {
    type: [String]
  }
});


userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'  
});

module.exports = mongoose.model('User', userSchema);
