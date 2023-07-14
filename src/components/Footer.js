import React from "react";
import { Link } from "react-router-dom";
import { AiFillYoutube, AiFillGithub, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer className="footer-details-section py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-dark">Contact Us</h4>
              <address className="text-dark fs-6">
                Software Development Building 1,
                <br />
                UL Cyberpark Fifth Floor,
                <br />
                ULCCS LTD Special Economic Zone,
                <br />
                Nellikode Village, Kozhikode, Kerala, 673016
              </address>
              <a href="tel:+123456799" className="text-dark mt-4 d-block">
                +123456799
              </a>
              <a
                href="mailto:test@gmail.com"
                className="text-dark mt-4 d-block mb-2"
              >
                test@gmail.com
              </a>
              <div className="social-icons d-flex align-item-center gap-30 mt-4">
                <a className="text-dark" href="#">
                  <AiFillInstagram className="fs-4" />
                </a>
                <a className="text-dark" href="#">
                  <AiFillGithub className="fs-4" />
                </a>
                <a className="text-dark" href="#">
                  <AiFillYoutube className="fs-4" />
                </a>
              </div>
            </div>
            <div className="col-3"></div>
            <div className="col-3">
              {" "}
              <h4 className="text-dark">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-dark py-2 mb-1">Laptops</Link>
                <Link className="text-dark py-2 mb-1">Headphones</Link>
                <Link className="text-dark py-2 mb-1">Tablets</Link>
                <Link className="text-dark py-2 mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-bottom py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-start mb-0 text-dark">
                &copy; {new Date().getFullYear()}: Powered by LOREM
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
