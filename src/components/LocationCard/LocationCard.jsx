import React from "react";
import styles from "./LocationCard.module.css"; // Import the CSS module

const LocationCard = ({ location, onClick }) => {
  return (
    <div className={styles.locationCard} onClick={() => onClick(location)}>
      <h4>{location.name}</h4>
      <p className={styles.type}>{location.type} </p>
      <p>
        Dimension:{" "}
        <span className={styles.dimension}>{location.dimension}</span>
      </p>
    </div>
  );
};

export default LocationCard;
