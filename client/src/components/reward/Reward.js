import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getReward } from "../../redux/action/rewardAction";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import "moment/locale/th";
import "./Reward.css";
import Widget from '../userdashboard/widget';

const Reward = () => {
  const dispatch = useDispatch();
  const reward = useSelector((state) => state.reward);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const [comfirm, setConfirm] = useState(false);
  // const handleCloseconfirm = () => setConfirm(false);
  // const handleShowconfirm = () => setConfirm(true);

  // const [showLottery, setshowLottery] = useState(false);
  // const [lotterydate, setlotterydate] = useState([]);
  // const handleLotteryClose = () => setshowLottery(false);
  // const handleShowLottery = (item) => {
  //   setshowLottery(true);
  //   setlotterydate(item);
  // };

  useEffect(() => {
    dispatch(getReward());
  }, []);

  return (
    <div className="container mt-3 p-4 bg-white card">

      <Widget/>

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
        {/* <div className="allReward mt-4">
          <h4>รางวัลทั้งหมด</h4>
        </div> */}
       
          {!reward.data?
          <div>wait</div> : reward.data.map((item, index) => {
          return (
            <div key={index} >
              <div className="card" >
                <div className="card-header reward-mobile">
                  <p className="card-titl mt-2">
                    หมายเลขรับรางวัล : {item.id}
                    {/* หมายเลขรับรางวัล : {reward.data.id} */}
                  </p>
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
                      ดูรายละเอียด 
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
