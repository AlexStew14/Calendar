import React from "react";

import Calendar from "./components/Calendar";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Calendar date={new Date()} />
    </div>
  );
};

export default App;
