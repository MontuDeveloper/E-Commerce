import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import heroImg from "../assets/images/hero-banner.jpg";

const Herobanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "https://www.bunaai.com/cdn/shop/files/8_892445da-e2d4-4650-a285-14bab9887ade.jpg?v=1716366810",
    "https://www.bunaai.com/cdn/shop/files/10_7413bb94-35d2-49b1-8233-829cf8da5955.jpg?v=1716030652",
    "https://www.bunaai.com/cdn/shop/files/10_72f94c8f-0aee-4145-8b17-719e7ab7c6c3.jpg?v=1716366811",
    "https://www.bunaai.com/cdn/shop/files/Kurta_Suit_Sets_web.jpg?v=1716367360",
  ];
  return (
    <section>
      <div className="hero-carousel">
        <Slider {...settings}>
          {images.map((image, index) => (
            <Link key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            </Link>
          ))}
        </Slider>
      </div>
      <div className="scrolling-text-container">
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
        <p className="scrolling-text">Summer Sale Is Live Save Upto 20%</p>
      </div>
    </section>
  );
};

export default Herobanner;
