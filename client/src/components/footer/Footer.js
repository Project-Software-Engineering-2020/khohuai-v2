import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLine } from "@fortawesome/free-brands-svg-icons";
// import logo from "./navbar/khohuai.png";

const Footer = () => {
  return (
    <footer className="bg-light text-left text-lg-start">
      {/* <div className="d-flex justify-content-center">
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0 mt-2">
              <h5 className="text-uppercase"></h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-dark">
                    <FontAwesomeIcon icon={faHome} />
                    &nbsp;&nbsp;หน้าแรก
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-dark">
                    <FontAwesomeIcon icon={faSearch} />
                    &nbsp;&nbsp;ค้นหาสลาก
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-4 mb-md-0 mt-2">
              <h5 className="text-uppercase"></h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-dark">
                    <FontAwesomeIcon icon={faMoneyBillAlt} />
                    &nbsp;&nbsp;ผลการออกสลากกินแบ่งรัฐบาล
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-dark">
                    <FontAwesomeIcon icon={faGamepad} />
                    &nbsp;&nbsp;เล่นเกม
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">ติดต่อเรา</h5>

              <ul className="list-unstyled">
                <li>
                  <a href="#!" class="text-dark">
                    <FontAwesomeIcon icon={faEnvelope} />
                    &nbsp;&nbsp; khohuai_2021@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#!" class="text-dark">
                    <FontAwesomeIcon icon={faLine} />
                    &nbsp;&nbsp; @khohuai_2021
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      <div className="copyright">
        <div class="text-center p-3">
          © 2020 Copyright 2021 Khohuai - All rights reserved
          {/* <a class="text-dark" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a> */}
        </div>
      </div>
    </footer>

    // <img src={logo} alt="khohuai" className="lottery-logo"></img>
  );
};

export default Footer;
