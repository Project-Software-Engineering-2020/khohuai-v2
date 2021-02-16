import React from 'react';
import './Home.css';
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";
import { useSelector } from 'react-redux' 

const Home = () => {

    const mycart = useSelector(state => state.cart);

    return (
        <div>
            <div className="home">
                <div className="container">
                    <Carousel />
                    <Foryou /> 
                    <Hot /> 
                </div>
            </div>
        </div>
    )

}

export default Home;