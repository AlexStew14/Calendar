import React, { Component } from "react";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
import CalendarBox from "./CalendarBox";
import EventCreateForm from "./EventCreateForm";
import EventViewForm from "./EventViewForm";
import EventEditForm from "./EventEditForm";

/**
 * This class encapsulates all the logic for the calendar.
 */
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarEvents: [],
      selectedDate: new Date(),
      currentMonthDate: props.date,
      showCreateEvent: false,
      showViewEvent: false,
      showEditEvent: false,
      selectedEvent: { title: null, date: new Date(), startTime: new Date(), endTime: new Date() },
    };
  }

  componentDidMount() {
    this.getCalendarBoxes();
  }

  /**
   * Load calendar information from the calendar api.
   */
  getCalendarBoxes = () => {
    axios
      .get("/api/calendar")
      .then((res) => {
        if (res.data) {
          this.setState({
            calendarEvents: {
              titles: res.data.map((d) => d.title),
              dates: res.data.map((d) => new Date(d.date)),
              startTimes: res.data.map((d) => new Date(d.startTime)),
              endTimes: res.data.map((d) => new Date(d.endTime)),
            },
          });
        }
      })
      .catch((err) => alert(err));
  };

  /**
   * Open the Modal for creating a calendar event.
   * Called from CalendarBox.
   */
  openCreateEventForm = (date) => {
    this.setState({ selectedDate: date, showCreateEvent: true });
  };

  /**
   * Close the Modal for creating a calendar event.
   * Called from EventCreateForm.
   */
  closeCreateEventForm = () => {
    this.setState({ showCreateEvent: false });
  };

  /**
   * Open the Modal for viewing a calendar event.
   * Called from CalendarBox.
   * @param {The event passed by javascript} jsEvent
   * @param {The calendar event selected for the View Modal} event
   */
  openViewEventForm = (jsEvent, event) => {
    // Prevent the click event on the calendar box from triggering.
    jsEvent.stopPropagation();
    this.setState({ selectedEvent: event, showViewEvent: true });
  };

  /**
   * Close the Modal for viewing a calendar event.
   * Called from EventViewForm.
   */
  closeViewEventForm = () => {
    this.setState({ showViewEvent: false });
  };

  /**
   * Open the Modal for editing a calendar event.
   * Called from EventViewForm
   */
  openEditEventForm = () => {
    this.setState({ showEditEvent: true, showViewEvent: false });
  };

  /**
   * Close the Modal for editing a calendar event.
   *
   */
  closeEditEventForm = () => {
    this.setState({ showEditEvent: false });
  };

  /**
   * Use the calendar api to create a new calendar event on the database.
   * Called from EventCreateForm.
   * @param {Calendar event name} title
   * @param {Calendar event begin time} startTime
   * @param {Calendar event end time} endTime
   */
  createEvent = (title, startTime, endTime) => {
    const data = {
      title: title,
      date: this.state.selectedDate,
      startTime: this.convertTimeToDate(startTime),
      endTime: this.convertTimeToDate(endTime),
    };
    axios.post("/api/calendar/create", data).catch((err) => console.log(err));
    this.getCalendarBoxes();
  };

  /**
   * Use the calendar api to delete a calendar event from the database.
   * Called from EventViewFrom.
   */
  deleteEvent = () => {
    this.closeViewEventForm();
    const data = {
      title: this.state.selectedEvent.title,
      date: this.state.selectedEvent.date,
      startTime: this.state.selectedEvent.startTime,
      endTime: this.state.selectedEvent.endTime,
    };
    axios.post("/api/calendar/delete_one", data).catch((err) => console.log(err));
    this.getCalendarBoxes();
  };

  /**
   * Use the calendar api to delete all the calendar events from the database.
   * Useful for testing delete functionality.
   */
  deleteEvents = () => {
    axios.post("/api/calendar/delete_all").catch((err) => console.log(err));
    this.getCalendarBoxes();
  };

  /**
   * Use the calendar api to edit a specified calendar event.
   * Called from the EventEditForm.
   * @param {The calendar event to be updated} oldEvent
   * @param {The calendar event information to replace the old event} newEvent
   */
  editEvent = (oldEvent, newEvent) => {
    const data = {
      newTitle: newEvent.title,
      newStartTime: this.convertTimeToDate(newEvent.startTime),
      newEndTime: this.convertTimeToDate(newEvent.endTime),
      oldTitle: oldEvent.title,
      oldStartTime: oldEvent.startTime,
      oldEndTime: oldEvent.endTime,
    };
    axios.post("/api/calendar/edit", data).catch((err) => console.log(err));
    this.getCalendarBoxes();
  };

  /**
   * Converts a time string like "11:25" to a date
   * on the same day as the state.selectedDate at the hour
   * and minutes from the time string.
   * @param {Time string for the event hours and minutes} eventTime
   * @returns A date on the selected date with the provided time.
   */
  convertTimeToDate = (eventTime) => {
    let timeDate = new Date("2000-01-01T" + eventTime);
    return new Date(
      this.state.selectedDate.getFullYear(),
      this.state.selectedDate.getMonth(),
      this.state.selectedDate.getDate(),
      timeDate.getHours(),
      timeDate.getMinutes()
    );
  };

  /**
   * Move the calendar to the next month.
   * This effects getDatesForPage.
   */
  nextMonth = () => {
    this.setState((state) => ({
      currentMonthDate: new Date(
        state.currentMonthDate.getFullYear(),
        state.currentMonthDate.getMonth() + 1,
        1
      ),
    }));
  };

  /**
   * Move the calendar to the previous month.
   * This effects getDatesForPage.
   */
  prevMonth = () => {
    this.setState((state) => ({
      currentMonthDate: new Date(
        state.currentMonthDate.getFullYear(),
        state.currentMonthDate.getMonth() - 1,
        1
      ),
    }));
  };

  /**
   * Gets the dates for the current calendar page based on state.currentMonthDate.
   * @returns List of days for the current calendar page
   */
  getDatesForPage = () => {
    let now = this.state.currentMonthDate;
    let days = [];
    if (now != null) {
      let thisMonth = now.getMonth();
      let thisYear = now.getFullYear();
      let prevDaysInMonth = new Date(thisYear, thisMonth, 0).getDate();
      let daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
      let monthStartDay = new Date(thisYear, thisMonth, 1).getDay();
      let monthEndDay = new Date(thisYear, thisMonth, daysInMonth).getDay();

      // Add relevant previous month's days
      for (let i = prevDaysInMonth - monthStartDay + 1; i <= prevDaysInMonth; i++) {
        days.push(new Date(thisYear, thisMonth - 1, i));
      }

      // Add current month's days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(thisYear, thisMonth, i));
      }

      for (let i = 1; i < 7 - monthEndDay; i++) {
        days.push(new Date(thisYear, thisMonth + 1, i));
      }
    }

    return days;
  };

  /**
   * Maps calendar events to each date on the calendar view.
   * @param {List of dates for the current calendar page} dates
   * @returns JS Map of dates as keys to lists of calendar events.
   */
  mapEventsToDates = (dates) => {
    let dateEvents = new Map();
    for (let i = 0; i < dates.length; i++) {
      dateEvents.set(dates[i], []);
    }

    if (this.state.calendarEvents == null || this.state.calendarEvents.titles == null) {
      return dateEvents;
    } else {
      for (let i = 0; i < this.state.calendarEvents.titles.length; i++) {
        for (let j = 0; j < dates.length; j++) {
          if (this.isSameDay(dates[j], this.state.calendarEvents.dates[i])) {
            dateEvents.get(dates[j]).push({
              title: this.state.calendarEvents.titles[i],
              date: this.state.calendarEvents.dates[i],
              startTime: this.state.calendarEvents.startTimes[i],
              endTime: this.state.calendarEvents.endTimes[i],
            });
          }
        }
      }
      return dateEvents;
    }
  };

  /**
   * Checks if two dates happen on the same day.
   * @param {First date to compare} d1
   * @param {Second date to compare} d2
   * @returns
   */
  isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  render() {
    let dates = this.getDatesForPage();
    let eventMap = this.mapEventsToDates(dates);
    let dayNumbers = [...Array(7).keys()];
    let rows = [...Array(dates.length / 7).keys()];
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let start = -1;
    let monthText = this.state.currentMonthDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    return (
      <>
        <h2>{monthText}</h2>
        <Button variant="primary" onClick={this.prevMonth}>
          Previous Month
        </Button>
        <Button variant="secondary" onClick={this.deleteEvents}>
          Delete Events
        </Button>
        <Button variant="primary" onClick={this.nextMonth}>
          Next Month
        </Button>

        <EventCreateForm
          createEvent={this.createEvent}
          show={this.state.showCreateEvent}
          handleShow={this.openCreateEventForm}
          handleClose={this.closeCreateEventForm}
        />

        <EventViewForm
          show={this.state.showViewEvent}
          handleClose={this.closeViewEventForm}
          handleDelete={this.deleteEvent}
          handleEdit={this.openEditEventForm}
          event={this.state.selectedEvent}
        />

        <EventEditForm
          show={this.state.showEditEvent}
          handleClose={this.closeEditEventForm}
          editEvent={this.editEvent}
          event={this.state.selectedEvent}
        />

        <Row className="flex-nowrap">
          {days.map((d) => (
            <div key={d} className="col">
              {d}
            </div>
          ))}
        </Row>
        {rows.map((r) => (
          <Row className="flex-nowrap" key={r}>
            {dayNumbers.map((n) => {
              ++start;
              return (
                <CalendarBox
                  date={dates[start]}
                  boxClickHandler={this.openCreateEventForm}
                  eventClickHandler={this.openViewEventForm}
                  events={eventMap.get(dates[start])}
                  key={dates[start]}
                />
              );
            })}
          </Row>
        ))}
      </>
    );
  }
}

export default Calendar;
