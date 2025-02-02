
import "./hotels.css";
import React, { useState, useRef, useEffect } from "react";


const RoomsDropdown = ({ onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const dropdownRef = useRef(null);

  // Notify parent component when room count changes
  useEffect(() => {
    if (onChange) {
      onChange(rooms);
    }
  }, [rooms, onChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="passenger-dropdown-container" ref={dropdownRef}>
      {/* Room Selection Button */}
      <select
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="passenger-button"
      >
        <option hidden>{rooms} Room{rooms > 1 ? "s" : ""}</option>
      </select>

      {/* Dropdown Panel */}
      <div className={`passenger-dropdown ${isDropdownOpen ? "open" : ""}`}>
        {/* Rooms */}
        <div className="passenger-controls">
          <span>Rooms</span>
          <div>
            <button onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
            <span> {rooms} </span>
            <button onClick={() => setRooms(rooms + 1)}>+</button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="passenger-dropdown-footer">
          <button onClick={() => setIsDropdownOpen(false)}>Cancel</button>
          <button className="done-button" onClick={() => setIsDropdownOpen(false)}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomsDropdown;
