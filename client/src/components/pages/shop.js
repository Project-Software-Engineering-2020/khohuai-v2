import React from 'react';
import './shop.css';
import { Carousel } from 'react-bootstrap'

const Shop = () => {
    return (
        <div>

            <div className="shop">
                <section className="header-shop">

                </section>
                <div className="container">
                    {/* <section class="">
                        <div id="demo" class="carousel slide shadow" data-ride="carousel">

                            <ul class="carousel-indicators">
                                <li data-target="#demo" data-slide-to="0" class="active"></li>
                                <li data-target="#demo" data-slide-to="1"></li>
                                <li data-target="#demo" data-slide-to="2"></li>
                            </ul>
                            <div class="carousel-inner">
                                <div class="carousel-item active">

                                    <img src="https://res.cloudinary.com/dvzib8cte/image/upload/v1593015941/msajodthxvtjeyx3iw7q.jpg" alt="" height="auto" width="auto" />

                                </div>
                                <div class="carousel-item">

                                    <img src="https://res.cloudinary.com/dvzib8cte/image/upload/v1593015941/msajodthxvtjeyx3iw7q.jpg" alt="" height="auto" width="auto" />

                                </div>
                                <div class="carousel-item">

                                    <img src="https://res.cloudinary.com/dvzib8cte/image/upload/v1593015941/msajodthxvtjeyx3iw7q.jpg" alt="" height="auto" width="auto" />

                                </div>

                            </div>


                            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </a>
                        </div>
                    </section> */}
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



            </div>
        </div>

    )

}

export default Shop;