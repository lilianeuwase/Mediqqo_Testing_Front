import React from 'react';
import NCD from '../components/NCDs/ncd';
import UserNavbar from '../components/userNavbar';



export default function NewConsult  ({patientInfo}) {


  return (
  <div>
  
   <UserNavbar />
   <NCD />
   </div>
   
  );
};
