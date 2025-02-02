import React from 'react';
import SearchAirport from './components/flights/searchAirport';
import SearchFlights from './components/flights/searchFlights';
import SearchHotels from './components/hotels/hotels';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import header from "./media/imgs/header.png"
function App() {
  return (

    <Router>
    <Layout>
    <div >
      <h1 style={{ paddingLeft: "5%",  }}>Sky Scrapper API</h1>
      <img src={header} alt="Header" style={{ width: "100%", height: "auto" }} /> 
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/airports" element={<SearchAirport />} />
      <Route path="/flights" element={<SearchFlights />} />
      <Route path="/hotels" element={<SearchHotels />} />
      </Routes>
    </div>
    </Layout>
  </Router>
  );
}

export default App;
