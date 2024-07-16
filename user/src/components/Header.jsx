import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Home from "../pages/Home";

const Header = () => {
  return (
    <>
      <div className="announcement-bar">
        <p className="announcement-texts">SUMMER SALE 50% OFF</p>
      </div>
      <div className="top-navbar-area">
        <div className="middle-header">
          <div className="container">
            <div className="middle-navbar">
              <div className="navbar-logo">
                <Link className="navbar-logo-brand" to="/">
                  Valdona
                </Link>
              </div>
              <div className="navbar-search-bar">
                <div class="input-group rounded navbar-search-input">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <span
                    class="input-group-text border-0 navbar-search-icon"
                    id="search-addon"
                  >
                    <CiSearch />
                  </span>
                </div>
              </div>
              <div className="navbar-right-part d-flex">
                <div className="navbar-wishlist-part">
                  <Link className="navbar-right-icon">
                    <FaRegHeart />
                  </Link>
                </div>
                <div className="navbar-auth-part">
                  <Link className="navbar-right-icon">
                    <FaRegUser />
                  </Link>
                </div>
                <div className="navbar-cart-part">
                  <Link className="navbar-right-icon cart-button">
                    <MdOutlineShoppingCart />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="top-nav-navbar">
          <div className="container">
            <div className="top-header-navbar">
              <ul className="d-flex top-navbar-list">
                <li className="top-navbar-item">
                  <NavLink className="top-navbar-link" to="/">
                    home
                  </NavLink>
                </li>
                <li className="top-navbar-item">
                  <NavLink className="top-navbar-link" to="/productView">
                    dress
                  </NavLink>
                </li>
                <li className="top-navbar-item">
                  <NavLink className="top-navbar-link" to="/kurti">
                    kurti
                  </NavLink>
                </li>
                <li className="top-navbar-item">
                  <NavLink className="top-navbar-link">sale</NavLink>
                </li>
                <li className="top-navbar-item">
                  <NavLink className="top-navbar-link">all-collections</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
