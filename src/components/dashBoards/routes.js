import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdFilter1,
  MdFilter2,
  MdFilter3,
  MdContactSupport,
  MdAddReaction
} from 'react-icons/md';

// Admin Imports
import MainDashboard from './doctor/views/admin/default';
import Hypertension from './doctor/views/admin/hypertension';
import Asthma from './doctor/views/admin/asthma';
import RTL from './doctor/views/admin/rtl';

//Diabetes
import Diabetes from './doctor/views/admin/diabetes';
import { UserData } from '../../DBConnection/UserData';
import AddUser from './admin/addUser';
import PatientProfile from './doctor/views/admin/diabetes/new/patientProfile';
import ProfileCard from './doctor/views/admin/diabetes/patients/components/profileCard';
import DaibPatientInfo from './doctor/views/admin/diabetes/patients';
import PatientVitalSigns from './doctor/views/admin/diabetes/new/patientVitalSigns';

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
    name: 'Diabetes Patient Card',
    layout: '/admin',
    icon: <Icon as={MdFilter1} width="20px" height="20px" color="inherit" />,
    path: '/diabetes/diabprofilecard',
    component: <DaibPatientInfo/>,
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
    name: 'Add User',
    layout: '/admin',
    path: '/adduser',
    icon: <Icon as={MdAddReaction} width="20px" height="20px" color="inherit" />,
    component: <AddUser />,
  },
  {
    name: 'Support',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdContactSupport} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },

  {
    name: 'View',
    layout: '/admin',
    path: '/view',
    icon: <Icon as={MdContactSupport} width="20px" height="20px" color="inherit" />,
    component: <PatientVitalSigns />,
  },


];
export default routes;
