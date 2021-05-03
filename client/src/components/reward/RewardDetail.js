import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getReward, getRewardDetail } from "../../redux/action/rewardAction";
import { useDispatch, useSelector } from "react-redux"
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import 'moment/locale/th';
import "./Reward.css";
const Reward = (props) => {

  const reward_id = props.match.params.id
  const dispatch = useDispatch();
  const reward = useSelector(state => state.reward)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comfirm, setConfirm] = useState(false);
  const handleCloseconfirm = () => setConfirm(false);
  const handleShowconfirm = () => setConfirm(true);

  const [showLottery, setshowLottery] = useState(false);
  const [lotterydate, setlotterydate] = useState([])
  const handleLotteryClose = () => setshowLottery(false);
  const handleShowLottery = (item) => {
    setshowLottery(true);
    setlotterydate(item)
  }



  useEffect(() => {
    dispatch(getRewardDetail(reward_id));
  }, [])

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
        
          {/* /.card-header */}
          <div className="card-body">
            <div className="tab-content p-0">
            <div className="row mb-3 ml-0">   
            <a href={"/reward"} class="backBtn"><i class="fa fa-chevron-left" aria-hidden="true"></i>  ย้อนกลับ</a>
            </div>  
              {/* Morris chart - Sales */}
              <h3 className="rewardIdDetail"> หมายเลขรับรางวัล : {reward_id} </h3>
              <p>
                งวดประจำวันที่{" "}
                <Moment format="DD MMMM YYYY" locale="th">
                  {reward.data.ngud_date}
                </Moment>
              </p>
              <p>เลขที่บัญชีสำหรับรับรางวัล</p>
              <p className="line">สถานะ :</p>{" "}
              <a className="linecolor" style={{cursor:'pointer'}} onClick={handleShow}>
                ดูหลักฐานการรับรางวัล
              </a>
              <table className="table m-0">
                <thead>
                  <tr>
                    <th>เลขสลาก</th>
                    <th>รางวัลที่ถูก</th>
                    <th>จำนวน (ใบ)</th>
                    <th>เงินรางวัลรวม (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {reward.data.lottery
                    ? reward.data.lottery.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td style={{cursor:'pointer', textDecoration:'underline'}} onClick={e => handleShowLottery(item.lottery)} >{item.number}</td>
                          <td>
                            {item.prize.map((pz) => {
                              return <p>{pz}</p>
                            })}
                          </td>
                          <td>{item.qty}</td>
                          <td><NumberFormat value={item.qty * item.reward} displayType={'text'} thousandSeparator={true}>{item.qty * item.reward}</NumberFormat></td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </table>
              <div className="section-summary-invoice">
                <div>**เลือกที่เลขสลากเพื่อดูสลากใบจริง**</div>
                <div>
                  <div className="summary-invoice">
                    <div className="info-summary">
                      <div>เงินรางวัลรวม</div>
                      <NumberFormat value={reward.data.win_total} displayType={'text'} thousandSeparator={true} className="winNumber"><div>{reward.data.win_total}</div></NumberFormat>
                      <div className="baht">บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>หักค่าบริการ 1.5%</div>
                      <NumberFormat value={reward.data.win_chart} displayType={'text'} thousandSeparator={true} className="winNumber"><div>{reward.data.win_chart}</div></NumberFormat>
                      <div className="baht">บาท</div>
                    </div>

                    <div className="info-summary">
                      <div>เงินรางวัลที่ได้รับทั้งสิ้น</div>
                      <NumberFormat value={reward.data.win_amount} displayType={'text'} thousandSeparator={true} className="winNumber"><div>{reward.data.win_amount}</div></NumberFormat>
                      <div className="baht">บาท</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-reward">
                <div className="txt">
                  **โปรดตรวจสอบเลขที่บัญชีให้ถูกต้องเพื่อรักษาผลประโยชน์ของท่าน**
                </div>
                {/* <Button onClick={handleShowconfirm}>ยืนยัน</Button> */}
              </div>
            </div>
          </div>
          {/* /.card-body */}
        </div>
      </div>

      {/*    แสดงสลาก */}
      <Modal size="md" show={showLottery} onHide={handleLotteryClose}>
        <Modal.Header closeButton>
          <Modal.Title>รูปสลาก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            lotterydate ?
              lotterydate.map((lottery) => {
                return <img
                  className="slip"
                  src={lottery}
                />
              })
              :
              null
          }

        </Modal.Body>

      </Modal>

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

      <Modal size="md" show={comfirm} onHide={handleCloseconfirm}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันข้อมูลการรับรางวัล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ชื่อบัญชี</p>
          <p>เลขที่บัญชี</p>
          <p>ธนาคาร</p>
          <div className="footer-final">
            <div>เงินรางวัลที่ได้รับ</div>
            <div className="bold">{reward.data.win_amount}</div>
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
