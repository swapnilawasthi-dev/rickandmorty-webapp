import React, { useEffect, useState } from "react";
import { getCharacterIds, getResidentIds } from "../../helpers/constant";
import apiService from "../../helpers/apiService";
import ProfileCard from "../ProfileCard/ProfileCard";
import Skeletons from "../Skeleton/Skeletons";
import styles from "./CharactersModal.module.css";

const CharactersModal = ({ item, type, onClose }) => {
  const [isRefreshing, setIsRefresing] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setIsRefresing(true);
    if (type == "episode") {
      var characterIds = getCharacterIds(item);
      if (characterIds != "") {
        getCharacters(characterIds);
      }
    } else {
      var residentIds = getResidentIds(item);
      if (residentIds != "") {
        getCharacters(residentIds);
      }
    }
  }, [item]);

  const getCharacters = async (characterIds) => {
    const result = await apiService("character/" + characterIds, "");
    // Check if episodes is an object and wrap it in an array if true
    setCharacters(Array.isArray(result) ? result : [result]);
    setIsRefresing(false);
  };

  if (!item) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {type == "episode" ? "Characters" : "Residents"} in {item.name} (
            {characters.length}){" "}
            <span className={styles.from}>[{type.toUpperCase()}]</span>
          </div>
          <div className={styles.closeButton} onClick={onClose}>
            Close
          </div>
        </div>
        <div className={styles.characterContainer}>
          {isRefreshing
            ? Array.from({ length: 20 }).map((_, index) => (
                <Skeletons key={index} type="character" />
              ))
            : characters.map((character) => (
                <ProfileCard key={character.id} character={character} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersModal;
