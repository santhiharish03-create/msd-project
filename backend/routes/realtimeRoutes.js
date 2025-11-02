const express = require('express');
const Timetable = require('../models/Timetable');
const router = express.Router();

// Broadcast current time and active classes
router.get('/broadcast-status', async (req, res) => {
  try {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const timetables = await Timetable.find();
    const activeClasses = [];
    
    timetables.forEach(timetable => {
      const schedule = timetable.schedule[day];
      if (schedule) {
        const currentSlot = Object.entries(schedule).find(([timeSlot]) => {
          const [start, end] = timeSlot.split('-');
          return timeStr >= start && timeStr <= end;
        });
        
        if (currentSlot) {
          activeClasses.push({
            section: timetable.section,
            subject: currentSlot[1],
            time: currentSlot[0],
            roomNumber: timetable.roomNumber,
            faculty: timetable.faculty[currentSlot[1]]
          });
        }
      }
    });
    
    // Broadcast to all connected clients
    req.app.get('io').emit('statusUpdate', {
      timestamp: now,
      activeClasses,
      totalSections: timetables.length
    });
    
    res.json({ message: 'Status broadcasted', activeClasses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;