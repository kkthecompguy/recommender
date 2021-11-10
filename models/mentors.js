const mongoose = require('mongoose');
const shortid = require('shortid');




const MentorSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String, 
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('mentors', MentorSchema);