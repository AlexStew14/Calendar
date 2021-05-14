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
      error: "Invalid parameters to create event",
    });
  }
});

router.post("/calendar/delete", (req, res, next) => {
  if (req.body.title && req.body.date && req.body.startTime && req.body.endTime) {
    CalendarEvent.deleteOne({
      date: req.body.date,
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    })
      .then((data) => res.json(data))
      .catch(next);
  } else {
    CalendarEvent.deleteMany({})
      .then((data) => res.json(data))
      .catch(next);
  }
});

router.post("/calendar/edit", (req, res, next) => {
  if (req.body.newTitle && req.body.oldTitle) {
    CalendarEvent.updateOne(
      {
        date: req.body.oldDate,
        title: req.body.oldTitle,
        startTime: req.body.oldStartTime,
        endTime: req.body.oldEndTime,
      },
      {
        date: req.body.newDate,
        title: req.body.newTitle,
        startTime: req.body.newStartTime,
        endTime: req.body.newEndTime,
      }
    )
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Invalid parameters to edit event.",
    });
  }
});

module.exports = router;
