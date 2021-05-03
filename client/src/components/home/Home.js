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
  const ngud = useSelector(state => state.ngud);

  useEffect(async () => {
    await dispatch(getCurrent());
    await dispatch(getMyCartFromDB())
  }, [])

  const mycart = useSelector((state) => state.cart);

  return (
    <div>
      <div className="home">
        <div className="container">
          <Carousel />

          {ngud.open ?
            <div>
              <Foryou />
              <Hot />
            </div>
            :
            <div>ไม่อยู่ในช่วงเวลาขาย</div>
          }

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
