import React, { useState } from 'react';
import Aside from './Aside';
import Main from './Main';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import L  from '../lotterythai/LotteryThailand';
import Game from '../game/Game';

function Layout({ setLocale }) {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? 'ar' : 'en');
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <div>Admin</div>
      {/* <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      /> */}
      {/* <Main
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
      /> */}
    </div>
    // <div>
    //   Hello! Admin
    // </div>
  );
}

export default Layout;
