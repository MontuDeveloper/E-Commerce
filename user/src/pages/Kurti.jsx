import React from "react";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";

const Kurti = () => {
  return (
    <div className="product-page-layout">
      <div className="page-header">
        <div className="container">
          <div className="text-center pb-50 ">
            <PageTitle title="Welcome to Our Clothing Store" />
            <h1>Kurti</h1>
          </div>
        </div>
      </div>
      <div className="product-page-content">
        <div className="page-main-part">
          <div className="container">
            <div className="row row-cols-4">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
        <div className="page-recommeded-product pt-70 pb-50">
          <div className="container">
            <div className="page-content-title pb-30">
              <h3>Recommended Products</h3>
            </div>
            <div className="row row-cols-4">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kurti;
