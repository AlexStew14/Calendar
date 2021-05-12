import React, { Component } from "react";
import { Button } from "react-bootstrap";

const CalendarBox = ({ date, events, boxClickHandler, eventClickHandler }) => {
  return (
    <div class="col p-1 btn" onClick={() => boxClickHandler(date)}>
      <div class="card text-white bg-light mb-1 h-100">
        <div class="card-header text-dark">{date.getDate()}</div>
        <div class="card-body pb-4 mb-3">
          {events.map((e) => {
            return (
              <div>
                <Button
                  variant="link"
                  class="card-text text-dark"
                  onClick={(jsEvent) => eventClickHandler(jsEvent, e)}
                >
                  {e.title}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarBox;
