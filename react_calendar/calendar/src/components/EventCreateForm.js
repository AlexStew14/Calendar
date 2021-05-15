import React, { Component } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

class EventCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startTime: null,
      endTime: null,
      invalidInput: false,
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
    if (!this.validateForm()) {
      this.setState({ invalidInput: true });
      return;
    }
    this.setState({ invalidInput: false });
    event.preventDefault();
    this.props.createEvent(this.state.title, this.state.startTime, this.state.endTime);
    this.setState({ title: "", startTime: new Date(), endTime: new Date() });
    this.props.handleClose();
  };

  handleClose = () => {
    this.setState({ invalidInput: false });
    this.props.handleClose();
  };

  validateForm = () => {
    return this.state.title && this.state.startTime && this.state.endTime;
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.handleClose}>
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
          {this.state.invalidInput && <Alert variant="danger">Invalid Input</Alert>}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
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
export default EventCreateForm;
