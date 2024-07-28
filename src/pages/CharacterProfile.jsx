import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

function CharacterProfile() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const character = await apiService(`character/${id}`, "");
    setCharacterDetails(character);
    const episodeIds = character?.episode
      .map((url) => url.split("/").pop())
      .join(",");
    const locationId = character?.location.url.split("/").pop();
    console.log(episodeIds, locationId);
    const episodes = await apiService(`episode/${episodeIds}`, "");
    const location = await apiService(`location/${locationId}`, "");

    const residentIds = location?.residents
      .map((url) => url.split("/").pop())
      .join(",");
    const residents = await apiService(`character/${residentIds}`, "");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <section className="profile_container">
        <div style={{ display: "flex" }}>
          <div className="profile_img_section">
            <img
              className="profile_img-LG"
              src={characterDetails?.image}
              alt="Profile"
            />
          </div>

          <div className="profile_desc_section">
            <h2>{characterDetails?.name}</h2>
            <h3>CEO</h3>
            <p className="description">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <div className="interests">
              <span className="interests_item">Technology</span>
              <span className="interests_item">Management</span>
              <span className="interests_item">Leadership</span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f3f6fd",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "30px",
              width: "40%",
              borderRadius: "30px",
            }}
          >
            <h3 style={{ color: "#5c6c74" }}>Featured Episodes</h3>
            <p className="description">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <div className="interests">
              <span className="interests_item">Technology</span>
              <span className="interests_item">Management</span>
              <span className="interests_item">Leadership</span>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#f3f6fd",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "30px",
            marginTop: "30px",
            borderRadius: "30px",
          }}
        >
          <h3 style={{ color: "#5c6c74" }}>Featured Episodes</h3>
          <p className="description">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <div className="interests">
            <span className="interests_item">Technology</span>
            <span className="interests_item">Management</span>
            <span className="interests_item">Leadership</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CharacterProfile;
