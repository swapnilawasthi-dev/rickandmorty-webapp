import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileCard.module.css";

function ProfileCard({ character }) {
  return (
    <article className={styles.card}>
      <div className={styles.img}></div>
      <Link
        style={{ textDecoration: "none" }}
        to={"/character/" + character?.id}
        className={styles.link}
      >
        <div
          style={{ backgroundImage: `url(${character?.image})` }}
          className={styles.imgHover}
        ></div>
        <div className={styles.info}>
          <h3 className={styles.title}>{character?.name}</h3>
          <div className={styles.container}>
            <p className={styles.category}>{character?.species}</p>
            <div
              className={character?.status && character?.status.toLowerCase()}
            >
              {character?.status}
            </div>
          </div>
          <span className={styles.by}>
            <span className={styles.author}>{character?.location?.name}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProfileCard;
