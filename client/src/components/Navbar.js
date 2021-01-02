import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import logo from '.././khohuai.png'


function Navbar() {
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
              <i className="fas fa-home" />    หน้าแรก
            </Link>
          </li>
          <li
            className='lottery-nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/find'
              className='lottery-nav-links'
              onClick={closeMobileMenu}
            >
              <i className='fas fa-search' />     ค้นหาสลาก
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='lottery-nav-item'>
            <Link
              to='/lottery'
              className='lottery-nav-links'
              onClick={closeMobileMenu}
            >
              <i className="fas fa-money-bill-alt" />   ผลการออกรางวัล
            </Link>
          </li>
          <li className='lottery-nav-item'>
            <Link
              to='/game'
              className='lottery-nav-links'
              onClick={closeMobileMenu}
            >
              <i className="fas fa-gamepad" />  เล่นเกม
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </div>
  );
}

export default Navbar;
