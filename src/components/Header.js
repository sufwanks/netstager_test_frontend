import React from "react";

const Header = () => {
  return (
    <>
      <header className="header-navbar py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-around">
              <h1 className="navbar-logo">
                <img src="images/logo.png" alt="logo" />
              </h1>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
