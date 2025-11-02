const Faculty = require('../models/Faculty');
const Timetable = require('../models/Timetable');

const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().select('name phone subjects');
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFacultySchedule = async (req, res) => {
  try {
    const { name } = req.params;
    const scheduleEntries = [];

    const timetables = await Timetable.find();
    
    timetables.forEach(timetable => {
      Object.entries(timetable.schedule).forEach(([day, slots]) => {
        Object.entries(slots).forEach(([time, subject]) => {
          if (subject && timetable.faculty[subject]?.includes(name)) {
            scheduleEntries.push({
              id: `${timetable.section}-${day}-${time}`,
              section: timetable.section,
              day,
              time,
              subject,
              roomNumber: timetable.roomNumber,
              faculty: timetable.faculty[subject]
            });
          }
        });
      });
    });

    res.json(scheduleEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllFaculty,
  getFacultySchedule,
  createFaculty
};