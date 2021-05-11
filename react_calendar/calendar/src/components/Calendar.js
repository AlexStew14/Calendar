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
    axios.post("/api/calendar", data).catch((err) => console.log(err));
  };

  getDatesForPage = () => {
    let now = new Date();
    let thisMonth = now.getMonth();
    let thisYear = now.getFullYear();
    let prevDaysInMonth = new Date(thisYear, thisMonth, 0).getDate();
    let daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
    let monthStartDay = new Date(thisYear, thisMonth, 1).getDay();
    let monthEndDay = new Date(thisYear, thisMonth, daysInMonth).getDay();
    let days = [];

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

    return days;
  };

  mapEventsToDates = (dates) => {
    let dateEvents = new Map();
    if (this.state.calendarEvents == null || this.state.calendarEvents.titles == null) {
      return dateEvents;
    } else {
      for (let i = 0; i < dates.length; i++) {
        dateEvents.set(dates[i], []);
      }

      for (let i = 0; i < this.state.calendarEvents.titles.length; i++) {
        for (let j = 0; j < dates.length; i++) {
          if (this.isSameDay(dates[j], this.state.calendarEvents.dates[i])) {
            dateEvents.get(dates[j]).push(this.state.calendarEvents.titles[j]);
          }
        }
      }
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
    return (
      <div>
        <h1>Calendar</h1>
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
              return <CalendarBox date={dates[start]} clickHandler={this.clickDay} events={[]} />;
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
