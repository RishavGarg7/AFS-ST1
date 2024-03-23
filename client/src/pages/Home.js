import React, { useEffect } from "react";
import "../utils/Style.css";

function Home() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <div className="outerContainer">
      <div className="container">
        <div className="side-image3">
          <div className="onimg">
            <h1>Welcome to the Main Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
