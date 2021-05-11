import React, { Component } from "react";

class CalendarBox extends Component {
  constructor(props) {
    super(props);
    this.state = { date: props.date, events: props.events };
  }

  render() {
    return (
      <div
        class="col p-1 btn"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={(e) => this.props.clickHandler(e, this.props.date)}
      >
        <div class="card text-white bg-dark mb-1">
          <div class="card-header">{this.state.date.getDate()}</div>
          <div class="card-body pb-2"></div>
        </div>
      </div>
    );
  }
}

export default CalendarBox;
