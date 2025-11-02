const express = require('express');
const {
  getAllRooms,
  getRoomSchedule,
  createRoom
} = require('../controllers/roomController');

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:roomNumber/schedule', getRoomSchedule);
router.post('/', createRoom);

module.exports = router;