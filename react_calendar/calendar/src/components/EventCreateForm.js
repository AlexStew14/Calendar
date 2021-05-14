import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class EventCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startTime: new Date(),
      endTime: new Date(),
    };
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleStartTimeChange = (time) => {
    this.setState({ startTime: time.target.value });
  };

  handleEndTimeChange = (time) => {
    this.setState({ endTime: time.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createEvent(this.state.title, this.state.startTime, this.state.endTime);
    this.setState({ title: "", startTime: new Date(), endTime: new Date() });
    this.props.handleClose();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="eventTitle">
                <Form.Label>Event title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.title}
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
      </div>
    );
  }
}
export default EventCreateForm;
