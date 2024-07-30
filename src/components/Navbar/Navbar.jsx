import React from "react";
import darkLogo from "../../assets/images/darkLogo.png";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SnowboardingIcon from "@mui/icons-material/Snowboarding";
import TheatersIcon from "@mui/icons-material/Theaters";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./Navbar.module.css";

function Navbar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <>
      <nav className={styles.nav}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <a href="/">
            <img src={darkLogo} className={styles.logo} alt="logo" />
          </a>
          <div>
            <span className={styles.title}>Rick and Morty</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link to="/character" className={styles.link}>
            {" "}
            Characters
          </Link>
          <Link to="/episode" className={styles.link}>
            {" "}
            Episodes
          </Link>
          <Link to="/location" className={styles.link}>
            {" "}
            Locations
          </Link>
        </div>
      </nav>
      <nav className={styles.bottomNavContainer}>
        <BottomNavigation
          sx={{
            "& .MuiBottomNavigationAction-label ": {
              fontFamily: "Bona Nova SC",
            },
            "& .css-1bjk3jo-MuiButtonBase-root-MuiBottomNavigationAction-root.Mui-selected ":
              {
                color: "#d28619",
              },
            backgroundColor: "#fcd3ab",
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue == 0) {
              navigate("/character");
            } else if (newValue == 1) {
              navigate("/episode");
            } else {
              navigate("/location");
            }
          }}
        >
          <BottomNavigationAction
            label="Characters"
            icon={<SnowboardingIcon />}
            className={[styles.bottomNavAction]}
          />
          <BottomNavigationAction
            label="Episodes"
            icon={<TheatersIcon />}
            className={styles.bottomNavAction}
          />
          <BottomNavigationAction
            label="Locations"
            icon={<LocationOnIcon />}
            className={styles.bottomNavAction}
          />
        </BottomNavigation>
      </nav>
    </>
  );
}

export default Navbar;
