import React from "react";
import { NavLink } from "react-router-dom";

const NavTabs = () => {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#f2f2f2" }}>
      <NavLink to="/routes">Routes</NavLink>
      <NavLink to="/compare">Compare</NavLink>
      <NavLink to="/banking">Banking</NavLink>
      <NavLink to="/pooling">Pooling</NavLink>
    </nav>
  );
};

export default NavTabs;
