import { useEffect, useState } from "react";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import "./cart.css"
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Coupon() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [chon, setChon] = useState(0);
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();
  
  async function getInvent() {
    await Axios.get("http://localhost:3001/game/get").then((inventory) => {
      for (let i in inventory.data) {
        if (inventory.data[i].name === "Chonlasit coin") {
          setChon(inventory.data[i].in_stock);
        }
      }
    });
  }

  async function setInvent(tokens, update_value) {
    await Axios.post("http://localhost:3001/game/set", {
      tokens,
      update_value
    });
  }

  useEffect(() => { 
    getInvent();
  }, []);

  function toggleUseCoin(value) {
    let totalPrice = cart.totalPrice;
    if(value){
      if(totalPrice - 20 >= chon){
        dispatch({type: "USE_COIN", coin : chon});
        setChon(0);
        setInvent("Chonlasit coin", 0);
      }
      else{
        dispatch({type: "USE_COIN", coin : totalPrice - 20});
        setChon(chon - totalPrice + 20);
        setInvent("Chonlasit coin", chon - totalPrice + 20);
      }
    }
    else{
      setChon(chon + cart.discount);
      dispatch({type: "UNUSE_COIN"});
      setInvent("Chonlasit coin", chon + cart.discount);
    }
    
  }


  return (
    <div>
      <div className="floatRight">
        <div>
          ใช้ Chonlasit coin (มีอยู่: {chon})
        </div>
        <label class="switch">
          <input type="checkbox" onChange={(e) => toggleUseCoin(e.target.checked)}/>
          <span class="slider round"></span>
        </label>
        
      </div>
      <div>
          ส่วนลด {}
      </div>
      
      
      
      {/* <Button variant="primary" onClick={handleShow} className="couponBtn">
        <FontAwesomeIcon icon={faTags} />
        ใช้ Chonlasit coin
      </Button> */}
      {/* <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เลือกคูปองส่วนลด</Modal.Title>
        </Modal.Header>
        <Modal.Body>ตอนนี้ยังไม่มีส่วนลด</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleClose}>
            คกลง
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export default Coupon;
