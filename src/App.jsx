import React from "react";
import { CalendarWithBarGraph } from "./components/CalendarWithBarGraph.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>React Big Calendar with Bar Graph</h1>
        <p>
          Select a date in the calendar to see date-wise data represented as a bar graph.
        </p>
      </header>
      <main className="app-main">
        <CalendarWithBarGraph />
      </main>
    </div>
  );
};

export default App;


