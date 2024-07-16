import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import KB059455 from "../assets/images/KB059455.jpg";
import KB059456 from "../assets/images/KB059456.jpg";
import KB059457 from "../assets/images/KB059457.jpg";
import KB059458 from "../assets/images/KB059458.jpg";
import KB059459 from "../assets/images/KB059459.jpg";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiCreditCard1 } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";
// import video from "../assets/images/video.mp4";

const ProductView = () => {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  // -------------------------------------------------
  return (
    <section>
      <div className="container-fluid">
        <div className="product-view-content">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
              <div className="product-image-gallery">
                <div className="row">
                  <div className="col-6">
                    <div className="product-image-item">
                      <img src={KB059455} alt="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="product-image-item">
                      <img src={KB059456} alt="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="product-image-item">
                      <img src={KB059457} alt="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="product-image-item">
                      <img src={KB059458} alt="" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="product-image-item">
                      <img src={KB059459} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
              <div className="product-detail-part">
                <div className="product-detail-inner">
                  <h1 className="product-detail-title">
                    Valdona cotton black & duppta kurta set
                  </h1>
                  <div className="pricebox-outer">
                    <div className="pricebox">
                      <span className="product-view-price">
                        <span className="money">₹ 4,500.00</span>
                      </span>
                    </div>
                    <p className="product-view-tex">Inclusive of all taxes</p>
                  </div>
                  <div className="product-size-selector">
                    <label className="variant-title">Select size</label>
                    <ul className="product-loop-variants">
                      <li className="varianr-option">
                        <label className="d-none">M</label>
                        <input
                          type="radio"
                          title="M"
                          className="productOption"
                          checked
                        />
                        <span className="option">M</span>
                      </li>
                      <li className="varianr-option">
                        <label className="d-none">L</label>
                        <input
                          type="radio"
                          title="L"
                          className="productOption"
                          checked
                        />
                        <span className="option">L</span>
                      </li>
                      <li className="varianr-option">
                        <label className="d-none">XL</label>
                        <input
                          type="radio"
                          title="XL"
                          className="productOption"
                          checked
                        />
                        <span className="option">XL</span>
                      </li>
                      <li className="varianr-option">
                        <label className="d-none">XXL</label>
                        <input
                          type="radio"
                          title="XXL"
                          className="productOption"
                          checked
                        />
                        <span className="option">XXL</span>
                      </li>
                    </ul>
                    <div className="newCustomSizeChart">
                      <span>Size Chart</span>
                    </div>
                  </div>

                  <div className="product-quantity">
                    <label className="variant-title">Select quantity</label>
                    <div className="quantity">
                      <button
                        type="button"
                        className="quantity-button quantity-down"
                      >
                        <span className="visually-hidden">
                          Decrease quantity
                        </span>
                        <FaMinus />
                      </button>
                      <input type="number" min={1} step={1} value={1} />
                      <button
                        type="button"
                        className="quantity-button quantity-up"
                      >
                        <span className="visually-hidden">
                          increse quantity
                        </span>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="text-center add-cart-btn">
                    <button
                      class="button-27 rounded-0 text-uppercase"
                      role="button"
                    >
                      add to cart
                    </button>
                  </div>
                  <div className="product-black">
                    <div className="delivery-for">
                      <div className="item">
                        <LiaShippingFastSolid />
                        <p>
                          <span> Express Shipping </span>
                        </p>
                      </div>
                      <div className="item">
                        <CiCreditCard1 />
                        <p>
                          <span>Cash on Delivery Available</span>
                        </p>
                      </div>
                      <div className="item">
                        <GiReturnArrow />
                        <p>
                          <span>Easy 15 Days Return Policy</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="product-detail-tabs">
                    <div className="product-detail-tabs-inner">
                      <MDBTabs pills className=" detail-tabs-list">
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleBasicClick("tab1")}
                            active={basicActive === "tab1"}
                            className="product-detail-link"
                          >
                            Description
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleBasicClick("tab2")}
                            active={basicActive === "tab2"}
                            className="product-detail-link"
                          >
                            Care Guide
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleBasicClick("tab3")}
                            active={basicActive === "tab3"}
                            className="product-detail-link"
                          >
                            Information
                          </MDBTabsLink>
                        </MDBTabsItem>
                      </MDBTabs>

                      <MDBTabsContent className="product-tab-content">
                        <MDBTabsPane open={basicActive === "tab1"}>
                          <div className="product-deatil-description">
                            <p style={{ marginBottom: "30px" }}>
                              Make heads turn with the graceful Sky Blue Lehenga
                              Set, perfect for adding a touch of elegance to any
                              special occasion. The exquisite and vibrant sky
                              blue hue adds a playful splash of color, while the
                              gold print on the blouse adds a touch of
                              traditional charm. The high-quality georgette
                              fabric ensures comfort and sophistication, while
                              the flowing silhouette of the lehenga skirt is
                              perfect for twirling and dancing the night away.
                              This stunning lehenga set is a true statement
                              piece that you'll love to flaunt and is sure to
                              make you feel confident, beautiful, and stylish.
                            </p>
                            <p>Model height: 5.4ft</p>
                            <p>Fabric: Jacquard Blouse and Georgette Lehenga</p>
                            <p> Handcrafted in India</p>
                            <p>
                              Size: Refer to size chart. Model is wearing size
                              Small.
                            </p>
                            <p>Lehenga set without dupatta.</p>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane open={basicActive === "tab2"}>
                          <div className="careGuideContent">
                            <p>
                              <b>
                                Washing Instructions: DRYCLEAN ONLY, Please
                                don't spray deodorant or perfumes directly on
                                the fabric.
                              </b>
                            </p>
                            <p>DISCLAIMER:</p>
                            <p>
                              Natural-dyed colours might bleed during the first
                              few washes or rub against the skin & other
                              light-coloured garments. In the artful process of
                              hand block-printing, embroidery work and
                              stitching, variations are likely to come into
                              existence. These irregularities are the hallmark
                              of all handmade products and give each style a
                              unique identity.
                            </p>
                            <p>
                              Like most brands, our products are photographed
                              professionally under controlled lighting. Colours
                              tend to be perceived differently depending on
                              factors such as shot angles, lighting, background
                              tones and colour temperatures. As a result, prints
                              and colours may vary 10% -12%. Nevertheless, we
                              strive to match the tones as close to the original
                              product colours as possible.
                            </p>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane open={basicActive === "tab3"}>
                          <p>
                            <strong>Net Quantity: </strong>1 N
                          </p>
                          <p>
                            <strong>Manufactured by:</strong>
                            <br />
                            Valdona Fashion
                            <br />
                            108, anupan bussines hub, yogi chok, nana varachha,
                            surat 395010
                            <br />
                          </p>
                          <p>
                            <strong>Country of Origin:</strong>
                            <br />
                            India
                          </p>
                          <p>
                            <strong>Customer Care Address:</strong>
                            <br />
                            valdona Fashion
                            <br />
                            108, anupan bussines hub, yogi chok, nana varachha,
                            surat 395010
                          </p>
                          <p>
                            <strong>Email:</strong>
                            <br />
                            <a href="">orders@gmail.com</a>
                          </p>
                          <p>
                            <strong>Phone:</strong>
                            <br />
                            <a href="">+91 1234567890</a>
                          </p>
                          <p>
                            <strong>Commodity:</strong>
                            <br />
                            Lehenga
                          </p>
                        </MDBTabsPane>
                      </MDBTabsContent>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductView;
