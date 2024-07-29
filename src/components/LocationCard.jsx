import React from "react";

const LocationCard = ({ location, onClick }) => {
  return (
    <div className="location_card" onClick={() => onClick(location)}>
      <h4>{location.name}</h4>
      <p
        style={{
          color: "#aa550a",
          fontFamily: "Bona Nova SC",
          fontSize: "16px",
        }}
      >
        {location.type}{" "}
      </p>
      <p>
        Dimension:{" "}
        <span
          style={{
            color: "#436c16",
            fontFamily: "Bona Nova SC",
            fontSize: "14px",
          }}
        >
          {location.dimension}
        </span>
      </p>
    </div>
  );
};

export default LocationCard;
