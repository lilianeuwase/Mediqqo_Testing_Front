import React from "react";
import AsthmaPatientTable from "../components/tables/asthma/asthmaPatientTable";
import DiabPatientTable from "../components/tables/diabetes/diabPatientTable";
import HyperPatientTable from "../components/tables/hypertension/hyperPatientTable";
import UserNavbar from "../components/userNavbar";

export default function AllPatients() {
  return (
    <div>
      <UserNavbar />
      <DiabPatientTable />
      <HyperPatientTable />
      <AsthmaPatientTable/>
    </div>
  );
}
