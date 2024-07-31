import React from "react";
import { Link } from "react-router-dom";

function ProfileCard({ character }) {
  return (
    <article className="card card--1">
      <div className="card__img"></div>
      <Link
        style={{ textDecoration: "none" }}
        to={"/character/" + character?.id}
        className="card_link"
      >
        <div
          style={{ backgroundImage: `url(${character?.image})` }}
          className="card__img--hover"
        ></div>
        <div className="card__info">
          <h3 className="card__title">{character?.name}</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="card__category">{character?.species}</p>
            <div
              className={character?.status && character?.status.toLowerCase()}
            >
              {character?.status}
            </div>
          </div>
          <span className="card__by">
            <span className="card__author">{character?.location?.name}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProfileCard;
