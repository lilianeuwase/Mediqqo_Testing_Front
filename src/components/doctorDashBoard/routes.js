import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdFilter1,
  MdFilter2,
  MdFilter3,
  MdContactSupport,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from './views/admin/default';
import Hypertension from './views/admin/hypertension';
import Asthma from './views/admin/asthma';
import RTL from './views/admin/rtl';

//Diabetes
import Diabetes from './views/admin/diabetes';
import Profile from './views/admin/diabetes/new/profile';

//Clinic
// import { UserData } from "../../DBConnection/UserData";
// const MainDashboard_name = "NCD Clinic" + "   |   " + UserData().hospital;

const routes = [
  {
    name: 'NCD Clinic',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },

  //Diabetes
  {
    name: 'Diabetes',
    layout: '/admin',
    icon: <Icon as={MdFilter1} width="20px" height="20px" color="inherit" />,
    path: '/diabetes',
    component: <Diabetes />,
  },
  {
    name: 'New Diabetes',
    layout: '/admin',
    icon: <Icon as={MdFilter1} width="20px" height="20px" color="inherit" />,
    path: '/diabetes/newconsult',
    component: <Profile/>,
  },

  {
    name: 'Hypertension',
    layout: '/admin',
    icon: <Icon as={MdFilter2} width="20px" height="20px" color="inherit" />,
    path: '/hypertension',
    component: <Hypertension />,
  },
  {
    name: 'Asthma',
    layout: '/admin',
    icon: <Icon as={MdFilter3} width="20px" height="20px" color="inherit" />,
    path: '/asthma',
    component: <Asthma />,
  },

  {
    name: 'Support',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdContactSupport} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
];
export default routes;
