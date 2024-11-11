import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [availability, setAvailability] = useState("unknown");

  const handleAvailabilityChange = (newState) => {
    setAvailability(newState);
    console.log("New state:", newState);
  };

  return (
    <div>
      <h2>Toggle Availability</h2>
      <ToggleSwitch
        currentState={availability}
        onChange={handleAvailabilityChange}
      />
    </div>
  );
}

function ToggleSwitch({ currentState, onChange }) {
  // Local state to manage the toggle internally based on the prop
  const [isAvailable, setIsAvailable] = useState(null);

  // Update local state whenever the external state changes
  useEffect(() => {
    if (currentState === "available") {
      setIsAvailable(true);
    } else if (currentState === "unavailable") {
      setIsAvailable(false);
    } else {
      setIsAvailable(null);
    }
  }, [currentState]);

  // Handle toggle change
  const handleToggle = () => {
    // Cycle through the states
    if (isAvailable === null) {
      setIsAvailable(true);
      onChange("available");
    } else if (isAvailable === true) {
      setIsAvailable(false);
      onChange("unavailable");
    } else {
      setIsAvailable(true);
      onChange("available");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label className="switch">
        <input
          type="checkbox"
          checked={isAvailable === true}
          onChange={handleToggle}
        />
        <span className="slider" />
      </label>
      <p style={{ marginLeft: "10px" }}>
        Status:{" "}
        {isAvailable === true
          ? "Available"
          : isAvailable === false
          ? "Unavailable"
          : "Unknown"}
      </p>

      {/* Styles for the switch */}
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 80px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${isAvailable === null
            ? "#ccc"
            : isAvailable
            ? "#4CAF50"
            : "#F44336"};
          transition: 0.4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: ${isAvailable === null ? "27px" : isAvailable ? "48px" : "4px"};
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
