const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

// /calendar/
router.get("/", calendarController.calendar_get);
router.post("/create", calendarController.calendar_create);
router.put("/:id", calendarController.calendar_edit);
router.delete("/:id", calendarController.calendar_delete);

module.exports = router;
