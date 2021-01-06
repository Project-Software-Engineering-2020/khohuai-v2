import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export default function Signout() {
  return (
    <Link to='sign-up'>
      <button className='signup-btn'>ออกจากระบบ</button>
    </Link>
  );
}