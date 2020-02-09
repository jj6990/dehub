const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  type: {
    type: String,
    default: 'Admin'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('admins', AdminSchema);
