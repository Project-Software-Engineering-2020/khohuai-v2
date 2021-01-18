import React from 'react';
import './Home.css';
import { Carousel } from 'react-bootstrap'
import carousel1 from "../../images/carousel1.gif"
import carousel2 from "../../images/carousel2.gif"
import carousel3 from "../../images/carousel3.gif"
import Foryou from "./foryou"
import Hot from "./hot"

const Home = () => {
    return (
        <div>
            <div className="home">

                <div className="container">

                    <Carousel>
                        <Carousel.Item interval={3500}>
                            <img
                                className="img-carousel"
                                src={carousel1}
                                alt="First slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item interval={3500}>
                            <img
                                className="img-carousel"
                                src={carousel2}
                                alt="Third slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item interval={3500}>
                            <img
                                className="img-carousel"
                                src={carousel3}
                                alt="Third slide"
                            />

                        </Carousel.Item>
                    </Carousel>

                    <Foryou> </Foryou>
                    <Hot> </Hot>


                </div>








            </div>
        </div>

    )

}

export default Home;