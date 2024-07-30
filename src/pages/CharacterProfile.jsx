import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../helpers/apiService";
import EpisodeCard from "../components/EpisodeCard";
import {
  getEpisodeIds,
  getLocationId,
  getResidentIds,
} from "../helpers/constant";
import LocationCard from "../components/LocationCard";
import ResidentCard from "../components/ResidentCard";

function CharacterProfile() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState([]);
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    getDetails();
  }, [id]);

  const getDetails = async () => {
    const character = await apiService(`character/${id}`, "");
    setCharacterDetails(character);

    const episodeIds = getEpisodeIds(character);
    const episodes = await apiService(`episode/${episodeIds}`, "");
    // Check if episodes is an object and wrap it in an array if true
    setFeaturedEpisodes(Array.isArray(episodes) ? episodes : [episodes]);

    const locationId = getLocationId(character);
    const location = await apiService(`location/${locationId}`, "");
    setLocationDetails(location);

    const residentIds = getResidentIds(location);
    const residents = await apiService(`character/${residentIds}`, "");
    setResidents(residents);
  };

  return (
    <div>
      <section className="profile_container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            fontFamily: "Orbitron",
          }}
        >
          {/* Character Details */}
          <div
            style={{
              display: "flex",
              width: "65%",
              border: "dashed",
              borderColor: "#aa550a",
              borderRadius: "40px",
              borderWidth: "1px",
              padding: "30px",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ fontSize: "40px", textDecoration: "underline" }}>
                  {characterDetails?.name}
                </div>
                <div
                  className={
                    characterDetails?.status
                      ? characterDetails?.status.toLowerCase()
                      : ""
                  }
                >
                  {characterDetails?.status}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: "Bona Nova SC",
                    fontSize: "24px",
                    color: "#7f8c8d",
                    textTransform: "capitalize",
                  }}
                >
                  {characterDetails?.species}
                </div>
                <div
                  style={{
                    fontFamily: "Bona Nova SC",
                    fontSize: "16px",
                    color: "#aa550a",
                    textTransform: "capitalize",
                  }}
                >
                  {characterDetails?.gender}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "20px 0px ",
                  fontFamily: "Bona Nova SC",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <div>Origin</div>
                  <div style={{ fontSize: "25px", color: "#457b9d" }}>
                    {characterDetails?.origin?.name}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>Type</div>
                    <div style={{ fontSize: "25px", color: "#457b9d" }}>
                      {characterDetails?.type
                        ? characterDetails?.type
                        : "unknown"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: "25px" }}>Location Details:</div>
                <LocationCard location={locationDetails} onnClick={() => {}} />
              </div>
            </div>
          </div>
          {/* Featured Episodes */}
          <div
            style={{
              backgroundColor: "#dff7f8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "20px",
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
            <div
              style={{
                overflow: "scroll",
                height: "300px",
              }}
            >
              {featuredEpisodes.map((episode, i) => (
                <EpisodeCard key={i} episode={episode} />
              ))}
            </div>
          </div>
        </div>
        {/* Other Location Residents */}
        <div
          style={{
            backgroundColor: "#dff7f8",
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
                <ResidentCard resident={resident} key={resident.id} />
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
