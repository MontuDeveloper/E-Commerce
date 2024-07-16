import React from "react";
import Herobanner from "../components/HeroBanner";
import advantage1 from "../assets/images/advantage1.png";
import advantage2 from "../assets/images/advantage2.png";
import advantage3 from "../assets/images/advantage3.png";
import advantage4 from "../assets/images/advantage4.png";
import advantage5 from "../assets/images/advantage5.png";
import saleimage1 from "../assets/images/saleimage1.png";
import saleimage2 from "../assets/images/saleimage2.png";
import collection1 from "../assets/images/collection1.jpg";
import collection2 from "../assets/images/collection2.jpg";
import collection3 from "../assets/images/collection3.jpg";
import collection4 from "../assets/images/collection4.jpg";
import collection5 from "../assets/images/collection5.jpg";
import collection6 from "../assets/images/collection6.jpg";
import client_1 from "../assets/images/client_1.jpg";
import celebs from "../assets/images/celebs.jpg";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <Herobanner />
      <section className="advantage-part">
        <div className="container">
          <div className="row row-cols-5">
            <div className="col">
              <div className="advantage-box">
                <div className="advantage-icon">
                  <img src={advantage2} alt="" />
                </div>
                <div className="advantage-text">
                  <h5>FREE SHIPPING</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="advantage-box">
                <div className="advantage-icon">
                  <img src={advantage3} alt="" />
                </div>
                <div className="advantage-text">
                  <h5>CASH ON DELIVERY</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="advantage-box">
                <div className="advantage-icon">
                  <img src={advantage4} alt="" />
                </div>
                <div className="advantage-text">
                  <h5>SAFE PAYMENT</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="advantage-box">
                <div className="advantage-icon">
                  <img src={advantage5} alt="" />
                </div>
                <div className="advantage-text">
                  <h5>ONTIME DELIVERY</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="advantage-box">
                <div className="advantage-icon">
                  <img src={advantage1} alt="" />
                </div>
                <div className="advantage-text">
                  <h5>MADE IN INDIA</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sale-section">
        <div className="sale-page-collection">
          <div className="container-fluid">
            <div className="row text-center justify-content-center">
              <div className="col-6 col-md-6">
                <Link>
                  <div>
                    <img src={saleimage1} alt="saleimage1" />
                  </div>
                </Link>
              </div>
              <div className="col-6 col-md-6">
                <Link>
                  <div>
                    <img src={saleimage2} alt="saleimage2" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div className="section-home-title">
            <Link to="">
              <h2>New Arrivals</h2>
            </Link>
            <h6>Women's Ethnicwear & Westernwear for everyday & ocassions</h6>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="text-center">
            <Link class="button-27" role="button" style={{ width: "200px" }}>
              show more
            </Link>
          </div>
        </div>
      </section>
      <section className="pt-70 ">
        <div className="container-fluid">
          <div className="section-home-title">
            <Link to="">
              <h2>Dress</h2>
            </Link>
            <h6>Women's Ethnicwear & Westernwear for everyday & ocassions</h6>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="text-center">
            <Link class="button-27" role="button" style={{ width: "200px" }}>
              show more
            </Link>
          </div>
        </div>
      </section>
      <section className=" pt-70">
        <div className="container-fluid">
          <div className="section-home-title">
            <Link to="">
              <h2>Kurta</h2>
            </Link>
            <h6>Women's Ethnicwear & Westernwear for everyday & ocassions</h6>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="text-center">
            <Link class="button-27" role="button" style={{ width: "200px" }}>
              show more
            </Link>
          </div>
        </div>
      </section>
      <section className="pt-70 pb-50 collection">
        <div className="container-fluid">
          <div className="section-home-title">
            <Link to="">
              <h2>Collection</h2>
            </Link>
          </div>
          <div className="collections-content">
            <div className="row row-cols-3">
              <div className="col collection-box">
                <Link>
                  <img src={collection1} alt="" />
                </Link>
              </div>
              <div className="col collection-box">
                <Link>
                  <img src={collection2} alt="" />
                </Link>
              </div>
              <div className="col collection-box">
                <Link>
                  <img src={collection3} alt="" />
                </Link>
              </div>
              <div className="col collection-box">
                <Link>
                  <img src={collection4} alt="" />
                </Link>
              </div>
              <div className="col collection-box">
                <Link>
                  <img src={collection5} alt="" />
                </Link>
              </div>
              <div className="col collection-box">
                <Link>
                  <img src={collection6} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" pb-50 collection">
        <div className="container-fluid">
          <div className="row row-cols-2">
            <div className="col">
              <Link>
                <img src={celebs} alt="" />
              </Link>
            </div>
            <div className="col">
              <Link>
                <img src={client_1} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
