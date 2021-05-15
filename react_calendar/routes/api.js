const express = require("express");
const router = express.Router();
const CalendarEvent = require("../models/calendar_event");

/**
 * Api for getting all calendar events.
 */
router.get("/calendar", (req, res, next) => {
  CalendarEvent.find({})
    .then((data) => res.json(data))
    .catch(next);
});

/**
 * Api for creating a new calendar event based on input data.
 */
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

/**
 * Api for deleting all calendar events.
 */
router.post("/calendar/delete_all", (req, res, next) => {
  CalendarEvent.deleteMany({})
    .then((data) => res.json(data))
    .catch(next);
});

/**
 * Api for deleting one calendar event that matches the input event.
 */
router.post("/calendar/delete_one", (req, res, next) => {
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
    res.json({
      error: "Invalid parameters to delete_one",
    });
  }
});

/**
 * Api for editing a calendar event by replacing a specified event with a new version.
 */
router.post("/calendar/edit", (req, res, next) => {
  if (req.body.newTitle && req.body.oldTitle) {
    CalendarEvent.updateOne(
      {
        title: req.body.oldTitle,
        startTime: req.body.oldStartTime,
        endTime: req.body.oldEndTime,
      },
      {
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
