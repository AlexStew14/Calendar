import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EventViewForm = ({ event, show, handleClose, handleDelete, handleEdit }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Event title</Form.Label>
              <p>{event.title}</p>
            </Form.Group>
            <Form.Group controlId="eventTitle">
              <Form.Label>Event start time</Form.Label>
              <p>
                {event.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </Form.Group>
            <Form.Group controlId="eventTitle">
              <Form.Label>Event end time</Form.Label>
              <p>{event.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventViewForm;
