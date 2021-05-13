import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import Calendar from "./components/Calendar";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Calendar</Navbar.Brand>
      </Navbar>
      <Calendar date={new Date()} />
    </div>
  );
};

export default App;
