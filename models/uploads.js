const mongoose = require('mongoose');
const shortid = require('shortid');


const ResumeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  filename: {
    type: String,
  },
  filepath: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('resumes', ResumeSchema);