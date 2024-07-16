import React, { useState } from "react";
import p2233 from "../assets/images/p2233.jpeg";
import p2234 from "../assets/images/p2234.jpeg";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

const ProductCard = () => {
  const productImage = {
    primaryImage: p2233,
    hoverImage: p2234,
    altText: "Product Name",
  };

  const [currentImage, setCurrentImage] = useState(productImage.primaryImage);

  const handleMouseEnter = () => {
    setCurrentImage(productImage.hoverImage);
  };

  const handleMouseLeave = () => {
    setCurrentImage(productImage.primaryImage);
  };
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Link>
        <div className="product-card-inner">
          <div
            className="product-card-img"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={currentImage} alt="" className="product-image" />
            {/* <img src={p2234} alt="" /> */}
          </div>
          <div className="product-content text-center">
            <div className="product-brand">
              <p>Valdona</p>
            </div>
            <div className="product-title">
              <p>Valdona cotten red dress</p>
            </div>
            <div className="product-price">
              <p>
                <span>&#8377;</span> 3345
              </p>
            </div>
          </div>
        </div>
        <div className="product-card-wishlist">
          <span className="product-card-wishlist-icon">
            <CiHeart />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
