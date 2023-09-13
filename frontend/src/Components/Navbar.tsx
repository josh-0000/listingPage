import React, { useContext } from "react";
import homeImg from "../Assets/home.png";
import profileImg from "../Assets/profile.png";
import cartImg from "../Assets/cart.png";
import Search from "./NavSearch";
import { UserContext } from "src/Context/UserContext";
import { ViewContext } from "src/Context/ViewContext";
function Navbar(): JSX.Element {
  const { cartSize } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);
  return (
    <div className="row">
      <nav className="navbar navbar-expand sticky-top bg-dark custom-navbar align-items-center">
        <div className="container-fluid p-0">
          <a className="navbar-brand text-white" href="adksops">
            Brand
          </a>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <Search />
            <ul className="navbar-nav ml-auto">
              <li className="nav-item w-100">
                <button className="nav-link active text-white white-icon w-100">
                  <img
                    src={homeImg}
                    className="home"
                    onClick={() => changePage("HOME")}
                  />
                </button>
              </li>
              <li className="nav-item w-100">
                <button
                  className="nav-link active text-white white-icon w-100"
                  onClick={() => changePage("LOGIN")}
                >
                  <img src={profileImg} className="profile" />
                </button>
              </li>
              <li className="nav-item d-flex align-items-center w-100">
                <button className="nav-link active text-white white-icon w-100">
                  <div className="d-flex flex-column align-items-center">
                    <img src={cartImg} className="cart" alt="Cart"></img>
                    <p className="cartSize mt-3">{cartSize}</p>
                  </div>
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
