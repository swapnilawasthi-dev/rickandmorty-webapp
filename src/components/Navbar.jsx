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
        padding: "0px 30px",
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
        <div>
          <span
            style={{
              fontFamily: "Playwrite BE WAL",
              fontWeight: "bold",
              fontSize: "1.7rem",
              marginLeft: "10px",
            }}
          >
            Rick and Morty
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link
          to="/character"
          style={{
            padding: "5px 15px",
            fontSize: "1.2rem",
            textDecoration: "none",
          }}
        >
          Characters
        </Link>
        <Link
          to="/episode"
          style={{
            padding: "5px 15px",
            fontSize: "1.2rem",
            textDecoration: "none",
          }}
        >
          Episodes
        </Link>
        <Link
          to="/location"
          style={{
            padding: "5px 15px",
            fontSize: "1.2rem",
            textDecoration: "none",
          }}
        >
          Locations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
