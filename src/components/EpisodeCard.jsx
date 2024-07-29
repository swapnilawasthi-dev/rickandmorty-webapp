import React from "react";

const EpisodeCard = ({ episode, onClick }) => {
  return (
    <div className="episode_card" onClick={() => onClick(episode)}>
      <h4>{episode.name}</h4>
      <p>
        <span>{episode.episode}</span> . {episode.air_date}
      </p>
    </div>
  );
};

export default EpisodeCard;
