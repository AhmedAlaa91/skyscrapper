import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    // <header style={{ padding: "10px", background: "#f8f8f8", borderBottom: "1px solid #ddd" }}>
    //   <nav>
    //     <Link to="/">Home</Link> | <Link to="/about">About</Link>
    //   </nav>
    // </header>

<header>
    <nav>
        <div >SkyScrapper</div>
        <nav className="nav-links">
        <NavLink 
          to="/Home" 
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          <button>Home</button>
        </NavLink> 
        | 
        <NavLink 
          to="/Flights"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <button>Flights</button>
        
        </NavLink> 
        | 
        <NavLink 
          to="/airports"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <button>Airports</button>
        
        </NavLink> 
        | 
        <NavLink 
          to="/hotels"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <button>Hotels</button>
        </NavLink> 
      </nav>
    </nav>
</header>
  );
};
export default Header;