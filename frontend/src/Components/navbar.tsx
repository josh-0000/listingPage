import React from "react";

function Navbar(): JSX.Element {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="adksops">
            Shopping
          </a>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link active text-white">Home</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active text-white">Profile</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active text-white">Cart</button>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
