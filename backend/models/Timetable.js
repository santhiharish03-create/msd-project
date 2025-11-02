const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  schedule: {
    Monday: { type: Object, default: {} },
    Tuesday: { type: Object, default: {} },
    Wednesday: { type: Object, default: {} },
    Thursday: { type: Object, default: {} },
    Friday: { type: Object, default: {} },
    Saturday: { type: Object, default: {} }
  },
  faculty: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Timetable', timetableSchema);