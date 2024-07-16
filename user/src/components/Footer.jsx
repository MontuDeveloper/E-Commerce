import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-inner ">
      <section class="subscribe-area pb-50 pt-70">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="subscribe-text mb-15">
                <span>JOIN OUR NEWSLETTER</span>
                <h2>subscribe newsletter</h2>
              </div>
            </div>
            <div class="col-md-8">
              <div class="subscribe-wrapper subscribe2-wrapper mb-15">
                <div class="subscribe-form">
                  <form action="#">
                    <input
                      placeholder="enter your email address"
                      type="email"
                    />
                    <button>
                      subscribe <FaLongArrowAltRight />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-menu-part">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="footer-menu-box">
                <div className="row">
                  <div className="col-12">
                    <div className="address">
                      <h5 className="text-light footer-menu-title ">Contact</h5>
                      <p>- MON-FRI - 9.00 AM TO 5.00 PM (IST)</p>
                      <p>- +91 84690 43991</p>
                      <p>- order@valdona.com</p>
                      <p>- 108, anupam bussines hub, yogi chok, surat 395010</p>
                      <p></p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="social-media">
                      <h5 className="text-light footer-menu-title">
                        Stay Connected
                      </h5>
                      <ul className="social-list">
                        <li className="social-item">
                          <a href="" className="social-link">
                            <FaFacebookF />
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="" className="social-link">
                            <FaInstagram />
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="" className="social-link">
                            <FaYoutube />
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="" className="social-link">
                            <FaLinkedinIn />
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="" className="social-link">
                            <FaPinterest />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="informetion-part footer-menu-box">
                <h5 className="footer-menu-title">INFORMATION</h5>
                <ul className="footer-menu-list">
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">Help</Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">My Account</Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">Track Order</Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">Privacy Policy</Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">
                      Delivery Information
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">
                      Refund, Exchanges and Returns
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">Terms of use</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="discover-part footer-menu-box">
                <h5 className="footer-menu-title">Discover</h5>
                <ul className="footer-menu-list">
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link" to="/blog">
                      Blog
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">About us</Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link className="footer-menu-link">Coupon</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fooret-bottom-content">
          <p className="fooret-bottom-text">
            &copy; {new Date().getFullYear()}; VALDONA.ALL RIGHTS RESERVED.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
