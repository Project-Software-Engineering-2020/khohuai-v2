import React from "react";
import "./Home.css";
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const mycart = useSelector((state) => state.cart);

  return (
    <div>
      {console.log(mycart)}
      <div className="home">
        <div className="container">
          <Carousel />
          <Foryou />
          <Hot />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
