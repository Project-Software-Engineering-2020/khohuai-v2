import { useState } from "react";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

function Coupon() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      ส่วนลด
      {/* <Button variant="primary" onClick={handleShow} className="couponBtn">
        <FontAwesomeIcon icon={faTags} />
        เลือกคูปอง
      </Button> */}
      <Modal
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
      </Modal>
    </div>
  );
}

export default Coupon;
