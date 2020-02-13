const mongoose = require('mongoose');

const UserPostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  _id: mongoose.Schema.Types.ObjectId,
  productImage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('posts', UserPostSchema);
