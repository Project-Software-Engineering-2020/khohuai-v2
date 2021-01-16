import React, { useState, useEffect, useRef } from 'react';
import {Redirect} from 'react-router-dom';
import './Button.css';
import { Link } from 'react-router-dom';
import {NavDropdown, DropdownButton,Dropdown} from 'react-bootstrap'
import {
  auth,
  firestore
} from "../firebase/firebase";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


export default function Button() {
  const dispatch = useDispatch();
  const [user, setuser] = useState(false)
  const userRef = useRef(firestore.collection("users")).current;

  // const dispatch = useDispatch();
  // const userstatus =  dispatch({type:'GET_STATUS_LOGIN'})
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!!user) {
        userRef.doc(user.uid).onSnapshot((doc) => {
          setuser(true);
        });
      } else {
        setuser(false);
      }
    });
    // return () => {
    //   authUnsubscribe();
    // };
  }, []);
  const signouthandle = () => {
    auth.signOut().then(() => {
      console.log("Logout OK");
      dispatch({ type: "SET_LOGOUT" });
      return <Redirect to="/" />
    })
      .catch((err) => {
        console.log("Logout Not work" + err)
      })
  }
  return (
    <div>
      {!user ? (
        <div>
          <Link to='/login'>
            <button className='signup-btn'>ลงชื่อเข้าใช้</button>
          </Link>
        </div>) : (
          <DropdownButton
            menuAlign="right"
            title={user.uid}
            id="dropdown-menu-align-right"
          >
            <Dropdown.Item eventKey="1" href="/me">ข้อมูลส่วนตัว</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2" onClick={signouthandle}>ออกจากระบบ</Dropdown.Item>
          </DropdownButton>
          // <div class="btn-group">
          //   <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          //     Right-aligned menu
          //   </button>
          //   <div class="dropdown-menu dropdown-menu-right">
          //     <button class="dropdown-item" type="button">ข้อมูลส่วนตัว</button>
          //     <button class="dropdown-item" type="button">ออกจากระบบ</button>
          //   </div>
          // </div>
        )
      }
    </div >

  );
}
