import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CharacterProfile from "./pages/CharacterProfile";
import Navbar from "./components/Navbar/Navbar";
import { DNA } from "react-loader-spinner";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <DNA
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/character" element={<Characters />} />
            <Route path="/episode" element={<Episodes />} />
            <Route path="/location" element={<Locations />} />
            <Route path="/character/:id" element={<CharacterProfile />} />
            <Route path="*" element={<Navigate to={"/character"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
