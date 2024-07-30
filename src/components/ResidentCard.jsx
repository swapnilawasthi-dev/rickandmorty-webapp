import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ResidentCard = ({ resident }) => {
  const navigate = useNavigate();
  return (
    <div
      className="resident_card episode_card"
      onClick={() => navigate("/character/" + resident.id)}
      style={{
        flex: "0 0 auto",
        marginRight: "20px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        padding: "15px",
        width: "120px",
        marginTop: "10px",
      }}
    >
      <img style={{ height: "120px", width: "120px" }} src={resident.image} />
      <h4 style={{ margin: "0 0 10px 0" }}>{resident.name}</h4>{" "}
      {/* Adds bottom margin */}
      <p style={{ margin: "0", color: "#7f8c8d" }}>{resident.species}</p>{" "}
      {/* Optional: styles text */}
    </div>
  );
};

export default ResidentCard;
