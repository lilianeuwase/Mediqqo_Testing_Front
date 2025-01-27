import { faB } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Navbar from "../components/comps/navbar";
import UserTable from "../components/tables/userTable";


export default function AdminHome({ userData }) {

  return (
    <div>
      <Navbar 
        a='Profile'
        link1='/profile'
        b='Users'
        link2='/users'
        c='N/A'
        link3=''
      />
      <UserTable />
    </div>
  );
}
