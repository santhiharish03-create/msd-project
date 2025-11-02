const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  section: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    default: 60
  },
  schedule: {
    Monday: { type: Object, default: {} },
    Tuesday: { type: Object, default: {} },
    Wednesday: { type: Object, default: {} },
    Thursday: { type: Object, default: {} },
    Friday: { type: Object, default: {} },
    Saturday: { type: Object, default: {} }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);