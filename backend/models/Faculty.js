const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  subjects: [{
    type: String
  }],
  schedule: [{
    section: String,
    day: String,
    time: String,
    subject: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', facultySchema);