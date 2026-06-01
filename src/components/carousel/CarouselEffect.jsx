import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./image/Data.jsx";
import "./Carousel.css";

function CarouselEffect() {
  return (
    <div className="carousel_container">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`slide-${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
