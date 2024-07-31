import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import apiService from "../../helpers/apiService";
import Filter from "../../components/Filter/Filter";
import hero from "../../assets/svg/hero.svg";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Listing.module.css";
import EpisodeCard from "../../components/EpisodeCard";
import LocationCard from "../../components/LocationCard";
import CharactersModal from "../../components/CharactersModal";

function Listing({ type }) {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, ...e });
    const queryParams = new URLSearchParams(e).toString();
    setQuery(queryParams);
  };

  useEffect(() => {
    getList();
  }, [filters, type]);

  const getList = async () => {
    try {
      const result = await apiService(type, query);
      setList(result.results);
      setTotalPages(result.info.pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    handleFilterChange({ page: selectedPage });
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img className={styles.heroImage} src={hero} alt="hero" />
        <h1 className={styles.title}> {type}S</h1>
      </div>
      <div className={styles.filterContainer}>
        <Filter isAdvanceFilter handleFilterChange={handleFilterChange} />
        <div className={styles.cardContainer}>
          {type == "character" &&
            list.map((character) => (
              <ProfileCard key={character.id} character={character} />
            ))}
          {type == "episode" &&
            list.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onClick={handleCardClick}
              />
            ))}
          {type == "location" &&
            list.map((location) => (
              <LocationCard
                key={location.id}
                onClick={handleCardClick}
                location={location}
              />
            ))}
        </div>
        <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
      </div>
      <CharactersModal
        item={selectedItem}
        type={type}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Listing;
