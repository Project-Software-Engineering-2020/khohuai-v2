import React, { useState, useEffect } from 'react';
import ButtonLogin from './Button';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import logo from './khohuai.png'
import { useSelector } from 'react-redux';

function Navbar() {

  const history = useHistory()

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
      <nav className='lottery-navbar  container'>
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
              to='/shop?position=all&number='
              className='lottery-nav-links'
              onClick={(e) => closeMobileMenu}
            >
              {/* {history.replace("?position=all&number=")} */}
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
          <li className="cart-on-nav">
            <a href="/cart" className="text-white">
              {/* <NotificationBadge count={cart.totalItem} effect={Effect.SCALE} >
                  <i class="fas fa-shopping-cart"></i>
                  </NotificationBadge> */}
                  
              <i className="fas fa-shopping-cart fa-lg"></i>
               <span className="badge-cart">{cart.totalItem}</span>
            </a>
          </li>
          <li className="nav-user">
            <ButtonLogin className="btn-login" />
          </li>

        </ul>
      </nav>
    </div>

  );
}

export default Navbar;
