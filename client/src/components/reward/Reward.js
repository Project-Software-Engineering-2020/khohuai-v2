import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Reward.css";
const Reward = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comfirm, setConfirm] = useState(false);
  const handleCloseconfirm = () => setConfirm(false);
  const handleShowconfirm = () => setConfirm(true);

  return (
    <div className="container mt-3 p-3 bg-white">
      <header className="header-purchase-page">
        <NavLink
          to="/purchase"
          activeClassName="purchase-item-active"
          className="purchase-item"
        >
          ประวัติการซื้อ
        </NavLink>
        <NavLink
          to="/reward"
          activeClassName="purchase-item-active"
          className="purchase-item"
        >
          การรับรางวัล
        </NavLink>
      </header>
      <div className="history-user-buy">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">
              หมายเลขรับรางวัล : {/* {invoice.data.invoiceid} */}
            </h5>
            <div>
              <span className="box">รับเงินรางวัลแล้ว</span>
            </div>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <div className="tab-content p-0">
              {/* Morris chart - Sales */}
              <p>
                สั่งซื้อวันที่{" "}
                {/* <Moment format="DD MMMM YYYY" locale="th">
                  {invoice.data.date}
                </Moment> */}
              </p>
              <p>
                งวดประจำวันที่{" "}
                {/* <Moment format="DD MMMM YYYY" locale="th">
                  {invoice.data.ngud_date}
                </Moment> */}
              </p>
              <p>เลขที่บัญชีสำหรับรับรางวัล</p>
              <p className="line">สถานะ :</p>{" "}
              <a className="linecolor" onClick={handleShow}>
                ดูหลักฐานการรับรางวัล
              </a>
              <table className="table m-0">
                <thead>
                  <tr>
                    <th>เลขสลาก</th>
                    <th>จำนวนใบ (ใบ)</th>
                    <th>จำนวน (ใบ)</th>
                    <th>เงินรางวัลรวม (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {console.log(detail.lottery)}
                  {invoice.data.lottery
                    ? invoice.data.lottery.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.qty}</td>
                            <td>{item.qty * 80}</td>
                          </tr>
                        );
                      })
                    : null} */}
                </tbody>
              </table>
              <div className="section-summary-invoice">
                <div>**เลือกที่เลขสลากเพื่อดูสลากใบจริง**</div>
                <div>
                  <div className="summary-invoice">
                    <div className="info-summary">
                      <div>เงินรางวัลรวมทั้งสิ้น</div>
                      <div>200,000</div>
                      <div>บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>หักค่าบริการ 1.5%</div>
                      <div>240</div>
                      <div>บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>เงินรางวัลที่ได้รับ</div>
                      <div>197,000</div>
                      <div>บาท</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-reward">
                <div className="txt">
                  **โปรดตรวจสอบเลขที่บัญชีให้ถูกต้องเพื่อรักษาผลประโยชน์ของท่าน**
                </div>
                <Button  onClick={handleShowconfirm}>ยืนยัน</Button>
              </div>
            </div>
          </div>
          {/* /.card-body */}
        </div>
      </div>
      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>หลักฐานการรับรางวัล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="slip"
            src="https://obs.line-scdn.net/0hd_rioZEKO3BPEBPqvuFEJ3VGOB98fChzKyZqcxN-ZUQ2dylxISZzHmxFYElqKXwuISJwHm0SIEEwIiwlcX5z/w644"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleClose}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="sm" show={comfirm} onHide={handleCloseconfirm}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันข้อมูลการรับรางวัล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ชื่อบัญชี</p>
          <p>เลขที่บัญชี</p>
          <p>ธนาคาร</p>
          <div className="footer-final">
          <div>เงินรางวัลที่ได้รับ</div>
          <div className="bold">197,000</div>
          <div>บาท</div>

</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseconfirm}>
            แก้ไขข้อมูล  
          </Button>
          <Button variant="primary" onClick={handleCloseconfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reward;
