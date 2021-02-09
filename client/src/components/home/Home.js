import React from "react";
import "./Home.css";
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div>
      <div className="home">
        <div className="container">
          <Carousel></Carousel>
          <Foryou />
          <Hot />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
