import React, { Component } from "react";
import axios from "axios";
import CalendarBox from "./CalendarBox";
import EventForm from "./EventForm";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarEvents: [],
      selectedDate: null,
      currentMonthDate: props.date,
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

  clickDay = (e, date) => {
    this.setState({ selectedDate: date });
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
            dateEvents.get(dates[j]).push(this.state.calendarEvents.titles[i]);
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
        <h1>Calendar</h1>
        <h2>{monthText}</h2>
        <button type="button" class="btn btn-primary" onClick={this.nextMonth}>
          Next Month
        </button>
        <button type="button" class="btn btn-secondary" onClick={this.deleteEvents}>
          Delete Events
        </button>
        <button type="button" class="btn btn-primary" onClick={this.prevMonth}>
          Previous Month
        </button>
        <EventForm createEvent={this.createEvent} />
        <div class="row">
          {days.map((d) => (
            <div class="col">{d}</div>
          ))}
        </div>
        {rows.map((r) => (
          <div class="row flex-nowrap">
            {dayNumbers.map((n) => {
              ++start;
              return (
                <CalendarBox
                  date={dates[start]}
                  clickHandler={this.clickDay}
                  events={eventMap.get(dates[start])}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
