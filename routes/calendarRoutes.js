const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');


router.get('/', calendarController.calendar_get)
router.post('/create', calendarController.calendar_create);
router.post('/edit', calendarController.calendar_edit);
router.delete('/delete', calendarController.calendar_delete)

module.exports = router;