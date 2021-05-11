import React, { Component } from "react";
import axios from "axios";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    this.props.createEvent(this.state.title);
    this.setState({ title: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Create Event
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form action="#">
                  <label>
                    Title:
                    <input
                      action="#"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                  </label>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.handleSubmit}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventForm;
