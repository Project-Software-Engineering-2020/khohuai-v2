import React, { useEffect } from "react";
import "./Home.css";
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux";
import { getMyCartFromDB } from '../../redux/action/cartAction';
import { useDispatch } from 'react-redux'

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getMyCartFromDB);

  }, [])

  const mycart = useSelector((state) => state.cart);

  return (
    <div>
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
