const mongoose = require('mongoose');
const shortid = require('shortid');




const InstituionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: {
    type: String,
    required: true
  },
  institutionCode: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('institution', InstituionSchema);