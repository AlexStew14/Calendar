import React, { Component } from "react";

const CalendarBox = ({ date, events, clickHandler }) => {
  return (
    <div
      class="col p-1 btn"
      data-toggle="modal"
      data-target="#exampleModal"
      onClick={(e) => clickHandler(e, date)}
    >
      <div class="card text-white bg-dark mb-1">
        <div class="card-header">{date.getDate()}</div>
        <div class="card-body pb-2">
          {events.map((e) => {
            return <p>{e}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarBox;
