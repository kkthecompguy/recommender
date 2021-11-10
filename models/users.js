const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userType: {
    type: String,
    enum: ['student','admin', 'mentor'],
    default: 'admin'
  }
}, { timestamps: true });

// encrypt password
UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

// sign JWT and return
UserSchema.methods.getJWT = function() {
  return jwt.sign({id:this._id}, '!@#$@1234', {expiresIn: '1h'})
}

//  verify password during login
UserSchema.methods.comparePass = async function(pass){
  return await bcrypt.compare(pass, this.password)
}

module.exports = mongoose.model('users', UserSchema);