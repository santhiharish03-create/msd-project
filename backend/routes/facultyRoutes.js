const express = require('express');
const {
  getAllFaculty,
  getFacultySchedule,
  createFaculty
} = require('../controllers/facultyController');

const router = express.Router();

router.get('/', getAllFaculty);
router.get('/:name/schedule', getFacultySchedule);
router.post('/', createFaculty);

module.exports = router;