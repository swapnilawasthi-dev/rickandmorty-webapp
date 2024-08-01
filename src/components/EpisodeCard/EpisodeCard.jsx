import React from "react";
import styles from "./EpisodeCard.module.css";

const EpisodeCard = ({ episode, onClick }) => {
  return (
    <div className={styles.episodeCard} onClick={() => onClick(episode)}>
      <h4>{episode.name}</h4>
      <p>
        <span>{episode.episode}</span> . {episode.air_date}
      </p>
    </div>
  );
};

export default EpisodeCard;
