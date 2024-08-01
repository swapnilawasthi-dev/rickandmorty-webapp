import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../helpers/apiService";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
import {
  getEpisodeIds,
  getLocationId,
  getResidentIds,
} from "../../helpers/constant";
import LocationCard from "../../components/LocationCard/LocationCard";
import ResidentCard from "../../components/ResidentCard/ResidentCard";
import CharactersModal from "../../components/CharactersModal/CharactersModal";
import styles from "./CharacterProfile.module.css";
import Skeletons from "../../components/Skeleton/Skeletons";

function CharacterProfile() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState([]);
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [residents, setResidents] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefresing] = useState(true);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    setIsRefresing(true);
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

    setIsRefresing(false);
  };

  return (
    <div>
      <section className={styles.profileContainer}>
        <div className={styles.profileDetails}>
          {/* Character Details */}
          <div className={styles.profileCard}>
            <div className={styles.profileImgSection}>
              {isRefreshing ? (
                <Skeletons type="profileImg" />
              ) : (
                <img
                  className={styles.profileImgLG}
                  src={characterDetails?.image}
                  alt="Profile"
                />
              )}
            </div>

            {isRefreshing ? (
              <Skeletons type="profileDetails" />
            ) : (
              <div className={styles.profileDescSection}>
                <div className={styles.title}>
                  <div className={styles.name}>{characterDetails?.name}</div>
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
                <div className={styles.title}>
                  <div className={styles.species}>
                    {characterDetails?.species}
                  </div>
                  <div className={styles.gender}>
                    {characterDetails?.gender}
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.originTitle}>
                    <div>Origin</div>
                    <div className={styles.origin}>
                      {characterDetails?.origin?.name}
                    </div>
                  </div>
                  <div className={styles.typeContainer}>
                    <div className={styles.typeTitle}>
                      <div>Type</div>
                      <div className={styles.type}>
                        {characterDetails?.type
                          ? characterDetails?.type
                          : "unknown"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.locationContainer}>
                  <div className={styles.location}>Location Details:</div>
                  <LocationCard
                    onClick={handleCardClick}
                    location={locationDetails}
                    onnClick={() => {}}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Featured Episodes */}
          <div className={styles.episodeContainer}>
            <div className={styles.episodeTitle}>Featured Episodes</div>
            <div className={styles.episodeCards}>
              {isRefreshing
                ? Array.from({ length: 20 }).map((_, index) => (
                    <Skeletons key={index} type="episode" />
                  ))
                : featuredEpisodes.map((episode, i) => (
                    <EpisodeCard
                      key={i}
                      onClick={handleCardClick}
                      episode={episode}
                    />
                  ))}
            </div>
          </div>
        </div>
        {/* Other Location Residents */}
        <div className={styles.residentsContainer}>
          <h3 className={styles.residentTitle}>
            Residents{" "}
            {locationDetails.length != 0
              ? `(${locationDetails?.residents?.length})`
              : ""}
          </h3>
          <div className={styles.residentCards}>
            {isRefreshing ? (
              Array.from({ length: 20 }).map((_, index) => (
                <Skeletons key={index} type="resident" />
              ))
            ) : residents.length > 0 ? (
              residents.map((resident) => (
                <ResidentCard resident={resident} key={resident.id} />
              ))
            ) : (
              <p>No residents found.</p> // Display a message if there are no residents
            )}
          </div>
        </div>
      </section>
      <CharactersModal
        item={selectedItem}
        type={selectedItem?.episode ? "episode" : "location"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default CharacterProfile;
