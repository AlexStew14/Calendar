import React, { Component } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

class EventEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      newStartTime: null,
      newEndTime: null,
      invalidInput: false,
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
    if (!this.validateForm()) {
      this.setState({ invalidInput: true });
      return;
    }
    event.preventDefault();
    const newEvent = {
      title: this.state.newTitle,
      startTime: this.state.newStartTime,
      endTime: this.state.newEndTime,
    };

    this.resetState();
    this.props.editEvent(this.props.event, newEvent);
    this.props.handleClose();
  };

  handleClose = () => {
    this.resetState();
    this.props.handleClose();
  };

  validateForm = () => {
    return this.state.newTitle && this.state.newStartTime && this.state.newEndTime;
  };

  resetState = () => {
    this.setState({
      newTitle: "",
      newStartTime: null,
      newEndTime: null,
      invalidInput: false,
    });
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="eventTitle">
                <Form.Label>Event title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.newTitle}
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
export default EventEditForm;
