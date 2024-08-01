import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResidentCard.module.css"; // Import the CSS module

const ResidentCard = ({ resident }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.residentCard} // Apply the CSS module class
      onClick={() => navigate("/character/" + resident?.id)}
    >
      <img
        className={styles.residentImage}
        src={resident?.image}
        alt={resident?.name}
      />
      <h4 className={styles.residentName}>{resident?.name}</h4>
      <p className={styles.residentSpecies}>{resident?.species}</p>
    </div>
  );
};

export default ResidentCard;
