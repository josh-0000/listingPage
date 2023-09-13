import React, { useContext } from "react";
import homeImg from "../Assets/home.png";
import profileImg from "../Assets/profile.png";
import cartImg from "../Assets/cart.png";
import Search from "./NavSearch";
import { AppContext } from "src/Context/AppContext";
function Navbar(): JSX.Element {
  const { cartSize } = useContext(AppContext);
  return (
    <div className="row">
      <nav className="navbar navbar-expand sticky-top bg-dark custom-navbar align-items-center">
        <div className="container-fluid p-0">
          <a className="navbar-brand text-white" href="adksops">
            Brand
          </a>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <Search />
            <ul className="navbar-nav ml-auto mb-2 align-items-center">
              <li className="nav-item">
                <button className="nav-link active text-white me-4 mt-2 white-icon">
                  <img src={homeImg} className="home" />
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link active text-white me-2 mt-2 white-icon">
                  <img src={profileImg} className="profile" />
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link active text-white mt-2 white-icon">
                  <img src={cartImg} className="cart" />
                  <p className="cartSize">{cartSize}</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
