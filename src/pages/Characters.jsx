import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import apiService from "../helpers/apiService";
import ReactPaginate from "react-paginate";
import Filter from "../components/Filter";
import hero from "../assets/svg/hero.svg";

function Characters() {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (e) => {
    setFilters({ ...filters, ...e });
    const queryParams = new URLSearchParams(e).toString();
    console.log(queryParams);
    setQuery(queryParams);
  };

  useEffect(() => {
    getCharacters();
  }, [filters]);

  const getCharacters = async () => {
    try {
      const result = await apiService("character", query);
      setCharacters(result.results);
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
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "200px",
            position: "absolute",
            left: "400px",
            bottom: "0",
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
          CHARACTERS
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
        <Filter isAdvanceFilter handleFilterChange={handleFilterChange} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {characters.map((character) => (
            <ProfileCard key={character.id} character={character} />
          ))}
        </div>
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
}

export default Characters;
