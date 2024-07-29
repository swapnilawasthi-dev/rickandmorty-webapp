import React, { useEffect, useState } from "react";
import apiService from "../helpers/apiService";
import ReactPaginate from "react-paginate";
import Filter from "../components/Filter";
import hero from "../assets/svg/hero.svg";
import LocationCard from "../components/LocationCard";
import CharactersModal from "../components/CharactersModal";

const Locations = () => {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
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
    console.log(queryParams);
    setQuery(queryParams);
  };

  useEffect(() => {
    getLocations();
  }, [filters]);

  const getLocations = async () => {
    try {
      const result = await apiService("location", query);
      setLocations(result.results);
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
    <div
      style={{
        margin: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div>
        <img
          style={{
            width: "200px",
            position: "absolute",
            top: -40,
            right: 300,
          }}
          src={hero}
          alt="hero"
        />
        <h1
          style={{
            fontFamily: "Orbitron",
            height: "100px",
            fontSize: "45px",
            color: "#1f1c2e",
          }}
        >
          LOCATIONS
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "#FEFEFE",
          borderRadius: "30px",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "Orbitron",
        }}
      >
        <Filter handleFilterChange={handleFilterChange} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              onClick={handleCardClick}
              location={location}
            />
          ))}
        </div>
        <CharactersModal
          item={selectedItem}
          type="location"
          onClose={handleCloseModal}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Locations;
