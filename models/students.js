const mongoose = require('mongoose');
const shortid = require('shortid');

function mentorCode() {
  Math.floor(Math.random() * 100000) + 1
}


const StudentSchema = new mongoose.Schema({
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
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ]
  },
  code: {
    type: String,
    default: mentorCode()
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('students', StudentSchema);