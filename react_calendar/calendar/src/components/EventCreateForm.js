import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class EventCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createEvent(this.state.title);
    this.setState({ title: "" });
    this.props.handleClose();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="eventTitle">
                <Form.Label>Event title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.title}
                  placeholder="Enter event title"
                  onChange={this.handleChange}
                />
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
