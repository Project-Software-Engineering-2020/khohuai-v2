import React from 'react';
import '../../App.css';
import{Carousel} from 'react-bootstrap'; 
export default function Home() {
  return (
    <div className='home'>
     <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://ichef.bbci.co.uk/news/976/cpsprodpb/41CF/production/_109474861_angrycat-index-getty3-3.jpg"
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*"
      alt="Third slide"
    />

    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/cat_1280p_0.jpg?itok=ZPUkZ5_m"
      alt="Third slide"
    />

    
  </Carousel.Item>
</Carousel>
    </div>
  );
}
