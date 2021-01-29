import React from 'react';
import './Home.css';
import Foryou from "./foryou";
import Hot from "./hot";
import Carousel from "./carousel";

const Home = () => {
    return (
        <div>
            <div className="home">
                <div className="container">
                    <Carousel ></Carousel>
                    <Foryou /> 
                    <Hot /> 
                </div>
            </div>
        </div>
    )

}

export default Home;