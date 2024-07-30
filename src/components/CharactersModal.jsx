import React, { useEffect, useState } from "react";
import { getCharacterIds, getResidentIds } from "../helpers/constant";
import apiService from "../helpers/apiService";
import ProfileCard from "./ProfileCard";

const CharactersModal = ({ item, type, onClose }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
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
  };

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 600 }}>
            {type == "episode" ? "Characters" : "Residents"} in {item.name} (
            {characters.length}){" "}
            <span
              style={{
                color: "#aa550a",
                fontFamily: "Bona Nova SC",
                fontSize: "16px",
              }}
            >
              [{type.toUpperCase()}]
            </span>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              cursor: "pointer",
              color: "darkred",
            }}
            onClick={onClose}
          >
            Close
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
            overflow: "scroll",
            height: "90%",
          }}
        >
          {characters &&
            characters.map((character) => (
              <ProfileCard key={character.id} character={character} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersModal;
