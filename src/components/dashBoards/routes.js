import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdFilter1,
  MdFilter2,
  MdFilter3,
  MdContactSupport,
  MdHowToReg,
  MdMiscellaneousServices
} from 'react-icons/md';

// Admin Imports
import MainDashboard from './doctor/views/admin/default';
import Hypertension from './doctor/views/admin/hypertension';
import Asthma from './doctor/views/admin/asthma';
import RTL from './doctor/views/admin/rtl';

//Diabetes
import Diabetes from './doctor/views/admin/diabetes';
import DaibPatientInfo from './doctor/views/admin/diabetes/patients';

//Users
import UserSettings from './admin/users';
import UserInfo from './admin/users/existing';


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
    name: 'Diabetes Patient Card',
    layout: '/admin',
    icon: <Icon as={MdFilter1} width="20px" height="20px" color="inherit" />,
    path: '/diabetes/diabprofilecard',
    component: <DaibPatientInfo/>,
    showInSidebar: false,
  },

  //Hypertension
  {
    name: 'Hypertension',
    layout: '/admin',
    icon: <Icon as={MdFilter2} width="20px" height="20px" color="inherit" />,
    path: '/hypertension',
    component: <Hypertension />,
  },

  //Asthma
  {
    name: 'Asthma',
    layout: '/admin',
    icon: <Icon as={MdFilter3} width="20px" height="20px" color="inherit" />,
    path: '/asthma',
    component: <Asthma />,
  },

  //Admin
  {
    name: 'Users',
    layout: '/admin',
    icon: <Icon as={MdHowToReg} width="20px" height="20px" color="inherit" />,
    path: '/users',
    component: <UserSettings />,
  },
  {
    name: 'User Card',
    layout: '/admin',
    icon: <Icon as={MdFilter1} width="20px" height="20px" color="inherit" />,
    path: '/users/userprofilecard',
    component: <UserInfo/>,
    showInSidebar: false,
  },
  {
    name: 'Permissions',
    layout: '/admin',
    icon: <Icon as={MdMiscellaneousServices} width="20px" height="20px" color="inherit" />,
    path: '/permissions',
   
  },

  {
    name: 'Support',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdContactSupport} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },

  // {
  //   name: 'View',
  //   layout: '/admin',
  //   path: '/view',
  //   icon: <Icon as={MdContactSupport} width="20px" height="20px" color="inherit" />,
  //   component: <PatientVitalSigns />,
  // },


];
export default routes;
