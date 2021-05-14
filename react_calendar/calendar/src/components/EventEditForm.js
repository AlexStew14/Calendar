import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class EventEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: props.event.title,
      newStartTime: props.event.startTime,
      newEndTime: props.event.endTime,
    };
  }

  handleTitleChange = (event) => {
    this.setState({ newTitle: event.target.value });
  };

  handleStartTimeChange = (time) => {
    this.setState({ newStartTime: time.target.value });
  };

  handleEndTimeChange = (time) => {
    this.setState({ newEndTime: time.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title: this.state.newTitle,
      startTime: this.state.newStartTime,
      endTime: this.state.newEndTime,
    };

    this.props.editEvent(this.props.event, newEvent);
    this.props.handleClose();
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="eventTitle">
                <Form.Label>Event title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.props.event.title}
                  placeholder="Enter event title"
                  onChange={this.handleTitleChange}
                />
              </Form.Group>
              <Form.Group controlId="eventStartTime">
                <Form.Label>Event start time</Form.Label>
                <Form.Control type="time" onChange={this.handleStartTimeChange} />
              </Form.Group>
              <Form.Group controlId="eventEndTime">
                <Form.Label>Event end time</Form.Label>
                <Form.Control type="time" onChange={this.handleEndTimeChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default EventEditForm;