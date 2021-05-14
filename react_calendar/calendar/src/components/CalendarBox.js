import React from "react";
import { Button } from "react-bootstrap";

const CalendarBox = ({ date, events, boxClickHandler, eventClickHandler }) => {
  return (
    <div className="col p-1 btn" onClick={() => boxClickHandler(date)}>
      <div className="card text-white bg-light mb-1 h-100">
        <div className="card-header text-dark">{date.getDate()}</div>
        <div className="card-body pb-4 mb-3">
          {events.map((e) => {
            return (
              <div>
                <Button variant="link" onClick={(jsEvent) => eventClickHandler(jsEvent, e)}>
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
