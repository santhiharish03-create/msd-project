const express = require('express');
const { body } = require('express-validator');
const {
  getTimetable,
  getAllTimetables,
  createTimetable,
  updateTimetable,
  getCurrentClass
} = require('../controllers/timetableController');

const router = express.Router();

router.get('/', getAllTimetables);
router.get('/:section', getTimetable);
router.get('/:section/current', getCurrentClass);

router.post('/', [
  body('section').notEmpty().withMessage('Section is required'),
  body('roomNumber').notEmpty().withMessage('Room number is required')
], createTimetable);

router.put('/:section', updateTimetable);

module.exports = router;