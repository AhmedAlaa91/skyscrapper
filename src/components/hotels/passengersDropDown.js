
import "./hotels.css"; 
import React, { useState, useRef, useEffect } from "react";



const PassengerDropdown = ({ onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const dropdownRef = useRef(null);

  const totalPassengers = adults + children + infants;

  // Notify parent when passenger count changes
  useEffect(() => {
    if (onChange) {
      onChange(totalPassengers);
    }
  }, [adults, children, infants, onChange]);

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
      {/* Passenger Button */}
      <div 
        className="passenger-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {totalPassengers} Guest{totalPassengers > 1 ? "s" : ""}
      </div>

      {/* Dropdown Panel */}
      {isDropdownOpen && (
        <div className="passenger-dropdown open">
          {/* Adults */}
          <div className="passenger-controls">
            <span>Adults</span>
            <div>
              <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
              <span> {adults} </span>
              <button onClick={() => setAdults(adults + 1)}>+</button>
            </div>
          </div>

          {/* Children */}
          <div className="passenger-controls">
            <span>Children</span>
            <div>
              <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
              <span> {children} </span>
              <button onClick={() => setChildren(children + 1)}>+</button>
            </div>
          </div>

          {/* Infants */}
          <div className="passenger-controls">
            <span>Infants</span>
            <div>
              <button onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
              <span> {infants} </span>
              <button onClick={() => setInfants(infants + 1)}>+</button>
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
      )}
    </div>
  );
};

export default PassengerDropdown;
