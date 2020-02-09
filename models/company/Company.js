const mongoose = require('mongoose');
delete mongoose.connection.models['companies'];
const CompanySchema = mongoose.Schema({
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
    default: 'Company'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('companies', CompanySchema);
