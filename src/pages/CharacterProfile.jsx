import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

function CharacterProfile() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState([]);
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [residents, setResidents] = useState([]);

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
    setFeaturedEpisodes(episodes);

    const location = await apiService(`location/${locationId}`, "");
    setLocationDetails(location);

    const residentIds = location?.residents
      .map((url) => url.split("/").pop())
      .join(",");
    const residents = await apiService(`character/${residentIds}`, "");
    setResidents(residents);
  };

  return (
    <div>
      <style>
        {`
          .episode_card:hover, .resident_card:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
      <section className="profile_container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="profile_img_section">
            <img
              className="profile_img-LG"
              src={characterDetails?.image}
              alt="Profile"
            />
          </div>

          <div className="profile_desc_section">
            <h2>{characterDetails?.name}</h2>
            <div className="character_details">
              <p>
                <strong>Status:</strong> {characterDetails?.status || "N/A"}
              </p>
              <p>
                <strong>Species:</strong> {characterDetails?.species || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {characterDetails?.gender || "N/A"}
              </p>
              <p>
                <strong>Origin:</strong>{" "}
                {characterDetails?.origin?.name || "N/A"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {characterDetails?.location?.name || "N/A"}
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f3f6fd",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "20px",
              width: "30%",
              borderRadius: "30px",
            }}
          >
            <div
              style={{
                color: "#5c6c74",
                fontSize: "1.4rem",
                margin: "10px",
                fontWeight: "bold",
                fontFamily: "Oswald",
              }}
            >
              Featured Episodes
            </div>
            <div style={{ overflow: "scroll", height: "300px" }}>
              {featuredEpisodes.map((episode) => (
                <div key={episode.id} className="episode_card">
                  <h4>{episode.name}</h4>
                  <p>
                    {episode.episode} . {episode.air_date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#f3f6fd",
            padding: "20px",
            marginTop: "30px",
            borderRadius: "30px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              color: "#5c6c74",
              fontWeight: "bold",
              fontFamily: "Oswald, sans-serif",
              margin: "0",
            }}
          >
            Residents{" "}
            {locationDetails.length != 0
              ? `(${locationDetails?.residents?.length})`
              : ""}
          </h3>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              paddingBottom: "10px",
            }}
          >
            {residents.length > 0 ? (
              residents.map((resident) => (
                <div
                  key={resident.id}
                  className="resident_card episode_card"
                  style={{
                    flex: "0 0 auto",
                    marginRight: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "15px",
                    width: "120px",
                    marginTop: "10px",
                  }}
                >
                  <img
                    style={{ height: "120px", width: "120px" }}
                    src={resident.image}
                  />
                  <h4 style={{ margin: "0 0 10px 0" }}>{resident.name}</h4>{" "}
                  {/* Adds bottom margin */}
                  <p style={{ margin: "0", color: "#7f8c8d" }}>
                    {resident.species}
                  </p>{" "}
                  {/* Optional: styles text */}
                </div>
              ))
            ) : (
              <p>No residents found.</p> // Display a message if there are no residents
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CharacterProfile;
