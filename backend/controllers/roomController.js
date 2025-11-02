const Room = require('../models/Room');
const Timetable = require('../models/Timetable');

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().select('roomNumber section capacity');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomSchedule = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const timetable = await Timetable.findOne({ roomNumber });
    
    if (!timetable) {
      return res.status(404).json({ message: 'Room schedule not found' });
    }

    res.json({
      roomNumber: timetable.roomNumber,
      section: timetable.section,
      schedule: timetable.schedule,
      faculty: timetable.faculty
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllRooms,
  getRoomSchedule,
  createRoom
};