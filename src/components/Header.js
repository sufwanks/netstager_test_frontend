// import Search from "antd/es/input/Search";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header-navbar py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-around">
              <h1 className="navbar-logo">
                <img  src="images/logo.png" alt="logo" />
              </h1>
            </div>

            {/* <div className="col-5 ">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/compare.svg" alt="" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div className="text-white">
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/wishlist.svg" alt="" />
                    <p className="mb-0">
                      {" "}
                      Favourite <br />
                      wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/user.svg" alt="" />
                    <p className="mb-0">
                      {" "}
                      Log in <br /> My Account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/cart.svg" alt="" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p>500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
