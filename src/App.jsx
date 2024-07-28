import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Listing from "./pages/Listing";
import CharacterProfile from "./pages/CharacterProfile";
import Header from "./components/Navbar";
import { ThreeCircles } from "react-loader-spinner";

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
            width: "100vw",
            height: "100vh",
          }}
        >
          <ThreeCircles
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
        <>
          <Header />
          <Routes>
            <Route path="/:type" element={<Listing />} />
            <Route path="/character/:id" element={<CharacterProfile />} />
            <Route path="*" element={<Navigate to={"/character"} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
