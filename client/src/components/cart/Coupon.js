import { useEffect, useState } from "react";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import "./cart.css"
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { api } from '../../environment'
function Coupon() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [chon, setChon] = useState(0);
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();

  
  
  async function getInvent() {
    await Axios.get(api + "/game/get").then((inventory) => {
      for (let i in inventory.data) {
        if (inventory.data[i].name === "Chonlasit coin") {
          setChon(inventory.data[i].in_stock);
        }
      }
    });
  }

  async function setInvent(tokens, update_value) {
    await Axios.post(api + "/game/set", {
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
      else if(totalPrice <= 20){
        //do nothing
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
      
      
   
    </div>
  );
}

export default Coupon;
