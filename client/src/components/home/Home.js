import React, { useEffect } from "react";
import "./Home.css";
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from 'react-redux'
import { getCurrent } from '../../redux/action/ngud'
const Home = () => {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  useEffect(async () => {
    await dispatch(getCurrent());
  }, [])

  return (
    <div className="landing-page">
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
