import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getReward } from "../../redux/action/rewardAction";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import "moment/locale/th";
import "./Reward.css";
const Reward = () => {
  const dispatch = useDispatch();
  const reward = useSelector((state) => state.reward);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comfirm, setConfirm] = useState(false);
  const handleCloseconfirm = () => setConfirm(false);
  const handleShowconfirm = () => setConfirm(true);

  const [showLottery, setshowLottery] = useState(false);
  const [lotterydate, setlotterydate] = useState([]);
  const handleLotteryClose = () => setshowLottery(false);
  const handleShowLottery = (item) => {
    setshowLottery(true);
    setlotterydate(item);
  };

  useEffect(() => {
    dispatch(getReward());
  }, []);

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
        <div className="allReward m-4">
          <h3>สรุปรางวัลทั้งหมด</h3>
        </div>
        {/* <div className="card">
          <div className="card-header">
            <h5 className="card-titl mt-2">
              หมายเลขรับรางวัล : {reward.data.id}
              หมายเลขรับรางวัล : {reward.data.id}
            </h5>
            <p className="card-titl mt-2">
              งวดประจำวันที่{" "}
              <Moment format="DD MMMM YYYY" locale="th">
                {reward.data.ngud_date}
              </Moment>
            </p>
            <div className="mt-2">
              {reward.data.success ? (
                <span className="box success ">รับเงินรางวัลแล้ว</span>
              ) : (
                <span className="box waiting">กำลังดำเนินการ</span>
              )}
            </div>
            <div className="mt-2">
              <a
                href={"/reward/detail/" + reward.data.id}
                class="btn btn-sm btn-info float-left"
              >
                ดูเพิ่มเติม
              </a>
            </div>
          </div> */}
          {reward.loading?
          <div>wait</div> : reward.data.map((item, index) => {
          return (
            <div key={index}>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-titl mt-2">
                    หมายเลขรับรางวัล : {item.id}
                    {/* หมายเลขรับรางวัล : {reward.data.id} */}
                  </h5>
                  <p className="card-titl mt-2">
                    งวดประจำวันที่{" "}
                    <Moment format="DD MMMM YYYY" locale="th">
                      {item.ngud_date}
                    </Moment>
                  </p>
                  <div className="mt-2">
                    {item.success ? (
                      <span className="box success ">รับเงินรางวัลแล้ว</span>
                    ) : (
                      <span className="box waiting">กำลังดำเนินการ</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <a
                      href={"/reward/detail/" + item.id}
                      class="rewardMoredetail"
                    >
                      ดูเพิ่มเติม 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
          
      
        </div>


     
    </div>
  );
};

export default Reward;
