const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// /calendar/
router.post('/', calendarController.calendar_get)
router.post('/create', calendarController.calendar_create);
router.put('/edit', calendarController.calendar_edit);
router.delete('/delete/:id', calendarController.calendar_delete)

module.exports = router;