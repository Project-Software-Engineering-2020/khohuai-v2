import React, { useState,useEffect } from 'react';
import ButtonLogin from './Button';
// import ButtonUser from './ButtonUSer';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import logo from './khohuai.png'
import { useSelector } from 'react-redux';

function Navbar() {

  const stetus = useSelector(state => state.auth)
  let cart = useSelector(state => state.cart)
  // const stotus = stetus.status;

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  useEffect(() => {
    // const stotus = stetus.status;
  }, [stetus])

  return (
    <div className="navbar-bg">
      <nav className='lottery-navbar container'>
        <Link to='/' onClick={closeMobileMenu} >
          <img src={logo} alt="khohuai" className="lottery-logo"></img>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'lottery-nav-menu active' : 'lottery-nav-menu'}>
          <li className='lottery-nav-item'>
            <Link to='/' className='lottery-nav-links' onClick={closeMobileMenu}>
              <i className="fas fa-home" /> หน้าแรก
            </Link>
          </li>
          <li
            className='lottery-nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/shop'
              className='lottery-nav-links'
              onClick={closeMobileMenu}
            >
              <i className="fas fa-store fa-1x"></i> ร้านค้าสลาก
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='lottery-nav-item'>
            <Link
              to='/lottery'
              className='lottery-nav-links'
              onClick={closeMobileMenu}
            >
              <i className="fas fa-money-bill-alt" /> ผลการออกรางวัล
            </Link>
          </li>
          <li className='lottery-nav-item'>
            <Link
              to='/game'
              className='lottery-nav-links'
              onClick={closeMobileMenu}
            >
              <i className="fas fa-gamepad" /> เล่นเกม
            </Link>
          </li>
          <a href="/cart" className="text-white"><i class="fas fa-shopping-cart"></i>{cart.totalItem}</a>
          <li className="nav-user">
            {/* {!stotus? (
            //   <Link
            //   to='/login'
            //   className='nav-links-mobile'
            //   onClick={closeMobileMenu}
            // >
            //   ลงชื่อเข้าใช้
            // </Link>
            <ButtonLogin className="btn-login" />
            ):(
              <ButtonLogin className="btn-login" />
            )} */}
            
            <ButtonLogin className="btn-login" />
          </li>
          
        </ul>
        
            {/* <ButtonLogin className="btn-login nav-links-mobile" /> */}
        
        {/* <ButtonLogin className="btn-login" /> */}
      </nav>
    </div>
  );
}

export default Navbar;
