import React, { Component } from "react";

const CalendarBox = ({ date, events, clickHandler }) => {
  return (
    <div
      class="col p-1 btn"
      data-toggle="modal"
      data-target="#exampleModal"
      onClick={(e) => clickHandler(e, date)}
    >
      <div class="card text-white bg-dark mb-1 h-100">
        <div class="card-header">{date.getDate()}</div>
        <div class="card-body pb-4 mb-3">
          {events.map((e) => {
            return <p class="card-text">{e}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarBox;
