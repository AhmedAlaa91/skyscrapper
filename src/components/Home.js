import React from "react";
import home from "../media/imgs/home.png";

const Home = () => {
  return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
<h2>WELCOME</h2>
  <img src={home} alt="Header" style={{ width: "70%", height: "auto" }} />
</div>
  );
};

export default Home;