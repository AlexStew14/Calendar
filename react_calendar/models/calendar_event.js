const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  date: Date,
});

const calendar_events = mongoose.model("calendar_event", CalendarEventSchema);

module.exports = calendar_events;
