import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Skeletons.module.css";
import ProfileCardStyles from "../ProfileCard/ProfileCard.module.css";
import EpisodeCardStyles from "../EpisodeCard/EpisodeCard.module.css";
import LocationCardStyles from "../LocationCard/LocationCard.module.css";
import ResidentCardStyles from "../ResidentCard/ResidentCard.module.css";

const Skeletons = ({ type }) => {
  return (
    <>
      {type == "character" && (
        <div className={ProfileCardStyles.card}>
          <Skeleton variant="rect" width={220} height={220} />
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={195} height={25} />
          </div>
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={195} height={25} />
          </div>
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={195} height={25} />
          </div>
        </div>
      )}
      {type == "episode" && (
        <div className={EpisodeCardStyles.episodeCard}>
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={150} height={20} />
          </div>
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={70} height={15} />
          </div>
        </div>
      )}
      {type == "location" && (
        <div
          className={LocationCardStyles.locationCard}
          style={{ padding: "5px" }}
        >
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={160} height={13} />
          </div>
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={100} height={10} />
          </div>
          <div className={styles.margin}>
            <Skeleton variant="rounded" width={130} height={10} />
          </div>
        </div>
      )}
      {type == "resident" && (
        <div className={ResidentCardStyles.residentCard}>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={120} height={120} />
          </div>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={100} height={15} />
          </div>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={50} height={15} />
          </div>
        </div>
      )}
      {type == "profileImg" && (
        <div>
          <div className={styles.mobileImg}>
            <Skeleton variant="rounded" width={200} height={220} />
          </div>
          <div className={styles.webImg}>
            <Skeleton variant="rounded" width={300} height={320} />
          </div>
        </div>
      )}
      {type == "profileDetails" && (
        <div>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={350} height={20} />
          </div>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={250} height={15} />
          </div>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={250} height={15} />
          </div>
          <div className={styles.marginVertical}>
            <Skeleton variant="rounded" width={250} height={15} />
          </div>
        </div>
      )}
    </>
  );
};

export default Skeletons;
