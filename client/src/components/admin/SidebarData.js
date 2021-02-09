import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
  
  {
    title: 'Home',
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    
  },
  {
    title: 'Lottery',
    path: '/lotteryreports',
    icon: <FaIcons.FaReceipt />
   
  },
  {
    title: 'Invoice',
    path: '/Invoice',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: 'User',
    path: '/aduser',
    icon: <IoIcons.IoMdPeople />
  },
  


];
