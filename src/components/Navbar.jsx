import React from "react";
import darkLogo from "../assets/images/darkLogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        // backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px",
        // borderBottomWidth: "1px",
        // borderBottomColor: "#ededed",
        // borderBottomStyle: "solid",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }}>
        <a href="/">
          <img
            src={darkLogo}
            style={{ width: "60px", height: "60px" }}
            alt="logo"
          />
        </a>
      </div>

      {/* Rick and Morty */}
      <div>
        <span
          style={{
            fontFamily: "Playwrite BE WAL",
            fontWeight: "bold",
            fontSize: "1.7rem",
          }}
        >
          Rick and Morty
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link
          to="/character"
          style={{ padding: "5px 15px", fontSize: "1.2rem" }}
        >
          Characters
        </Link>
        <Link to="/episode" style={{ padding: "5px 15px", fontSize: "1.2rem" }}>
          Episodes
        </Link>
        <Link
          to="/location"
          style={{ padding: "5px 15px", fontSize: "1.2rem" }}
        >
          Locations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
