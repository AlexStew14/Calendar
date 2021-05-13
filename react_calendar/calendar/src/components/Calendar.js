import React, { Component } from "react";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
import CalendarBox from "./CalendarBox";
import EventCreateForm from "./EventCreateForm";
import EventViewForm from "./EventViewForm";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarEvents: [],
      selectedDate: null,
      currentMonthDate: props.date,
      showCreateEvent: false,
      showViewEvent: false,
      selectedEvent: { title: null, date: null },
    };
  }

  componentDidMount() {
    this.getCalendarBoxes();
  }

  getCalendarBoxes = () => {
    axios
      .get("/api/calendar")
      .then((res) => {
        if (res.data) {
          this.setState({
            calendarEvents: {
              titles: res.data.map((d) => d.title),
              dates: res.data.map((d) => new Date(d.date)),
            },
          });
        }
      })
      .catch((err) => alert(err));
  };

  openCreateEventForm = (date) => {
    this.setState({ selectedDate: date, showCreateEvent: true });
  };

  closeCreateEventForm = () => {
    this.setState({ showCreateEvent: false });
  };

  openViewEventForm = (jsEvent, event) => {
    jsEvent.stopPropagation();
    this.setState({ selectedEvent: event, showViewEvent: true });
  };

  closeViewEventForm = () => {
    this.setState({ showViewEvent: false });
  };

  createEvent = (title) => {
    const data = {
      title: title,
      date: this.state.selectedDate,
    };
    axios.post("/api/calendar/create", data).catch((err) => console.log(err));
    this.getCalendarBoxes();
  };

  deleteEvents = () => {
    axios.post("/api/calendar/delete").catch((err) => console.log(err));
    this.getCalendarBoxes();
  };

  nextMonth = () => {
    this.setState((state) => ({
      currentMonthDate: new Date(
        state.currentMonthDate.getFullYear(),
        state.currentMonthDate.getMonth() + 1,
        1
      ),
    }));
  };

  prevMonth = () => {
    this.setState((state) => ({
      currentMonthDate: new Date(
        state.currentMonthDate.getFullYear(),
        state.currentMonthDate.getMonth() - 1,
        1
      ),
    }));
  };

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
            });
          }
        }
      }
      return dateEvents;
    }
  };

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
      <div>
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
          event={this.state.selectedEvent}
        />

        <Row className="flex-nowrap">
          {days.map((d) => (
            <div class="col">{d}</div>
          ))}
        </Row>
        {rows.map((r) => (
          <Row className="flex-nowrap">
            {dayNumbers.map((n) => {
              ++start;
              return (
                <CalendarBox
                  date={dates[start]}
                  boxClickHandler={this.openCreateEventForm}
                  eventClickHandler={this.openViewEventForm}
                  events={eventMap.get(dates[start])}
                />
              );
            })}
          </Row>
        ))}
      </div>
    );
  }
}

export default Calendar;
