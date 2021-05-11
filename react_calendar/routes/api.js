const express = require("express");
const router = express.Router();
const CalendarEvent = require("../models/calendar_event");

router.get("/calendar", (req, res, next) => {
  CalendarEvent.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/calendar/create", (req, res, next) => {
  if (req.body.title && req.body.date) {
    CalendarEvent.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: req.body,
    });
  }
});

router.post("/calendar/delete", (req, res, next) => {
  CalendarEvent.deleteMany({})
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
