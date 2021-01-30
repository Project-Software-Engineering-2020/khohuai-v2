import React from 'react';
// import './shop.css';
import { Carousel } from 'react-bootstrap'
import carousel1 from "../../images/carousel1.gif"
import carousel2 from "../../images/carousel2.gif"
import carousel3 from "../../images/carousel3.gif"

const CarouselItem = () => {
    return (
        <div>
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

            {/* <div>
                <div className="container">
                    <Carousel>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/dvzib8cte/image/upload/v1593015941/msajodthxvtjeyx3iw7q.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={500}>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/dvzib8cte/image/upload/v1593015941/msajodthxvtjeyx3iw7q.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/dvzib8cte/image/upload/v1593015941/msajodthxvtjeyx3iw7q.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div> */}
        </div>

    )

}

export default CarouselItem;