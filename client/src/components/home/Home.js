import React, { useEffect } from "react";
import "./Home.css";
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";
import Footer from "../footer/Footer";
import { getMyCartFromDB } from '../../redux/action/cartAction';
import { useDispatch, useSelector } from 'react-redux'
import { getCurrent } from '../../redux/action/ngud'
const Home = () => {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  useEffect(async () => {
    await dispatch(getCurrent());
    // if (auth.status === true) {
    //   await dispatch(getMyCartFromDB())
    // }
  }, [])


  return (
    <div>
      <div className="home">
        <div className="container">
          <Carousel />
          <div>
            <Foryou />
            <Hot />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
