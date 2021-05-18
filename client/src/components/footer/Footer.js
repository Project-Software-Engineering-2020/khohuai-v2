import React from "react";
import "./footer.css";
import chon from '../../images/dev/1.png';
import boss from '../../images/dev/2.png';
import toy from '../../images/dev/3.png';
import aum from '../../images/dev/4.png';
import jujee from '../../images/dev/5.jpg';

const Footer = () => {
  return (
    <footer className="text-center footer">
      {/* <div className="d-flex justify-content-center bg-white">
        <div className="container p-4 ">
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
      {/* <div className="container p-3">
        <h5 className="text-center">ทีมผู้พัฒนา</h5>
        <div className="developer-team">
          <div >
            <img src={chon} alt="ชลสิทธิ์ สาตสุข" className="dev"/>
            <div> ชลสิทธิ์ สาตสุข</div>
           
          </div>
          <div >
          <img src={boss} alt="ไตรรัตน์ จามรธวัช" className="dev"></img>
            <div>ไตรรัตน์ จามรธวัช</div>
          </div>

          <div >
          <img src={toy} alt="เธียรวิชญ์ สิริสาครสกุล" className="dev"></img>
          <div> เธียรวิชญ์ สิริสาครสกุล</div>
          </div>
          <div >
          <img src={aum} alt="ณัฐชภา ลักษโนวาท" className="dev"></img>
          <div>ณัฐชภา ลักษโนวาท</div>
            
          </div>
          <div >
          <img src={jujee} alt="ณัฐมน วุฒิเวชนันท์" className="dev"></img>
          <div>ณัฐมน วุฒิเวชนันท์</div>
            
          </div>
        </div>
      </div> */}
      


      <div className="copyright">
        <div class="text-center p-3">
          © Copyright 2021 Khohuai - All rights reserved
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;
