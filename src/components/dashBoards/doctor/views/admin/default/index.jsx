// Chakra imports
import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Assets
import banner from "../../../assets/img/auth/banner.png";
import avatar from "../../../assets/img/avatars/avatar4.png";
import Banner from "../../../views/admin/default/components/Banner";
import MiniCalendar from "../../../components/calendar/MiniCalendar";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import AppointmentTable from "./components/AppointmentTable.js";
import PieCard from "../../../views/admin/default/components/PieCard";
import { columnsDataCheck } from "../../../views/admin/default/variables/columnsData";
import tableDataCheck from "../../../views/admin/default/variables/tableDataCheck.json";
import GeneralInformation from "./components/General";

// DB Imports
import { DiabetesPatients } from "../../../../../../DBConnection/DiabetesPatients";
import { HypertensionPatients } from "../../../../../../DBConnection/HypertensionPatients";
import { AsthmaPatients } from "../../../../../../DBConnection/AsthmaPatients";
import { UserData } from "../../../../../../DBConnection/UserData";

export default function UserReports() {
  // Fetch User Data
  const userData = UserData();
  const userHospital = userData?.hospital || "Unknown Hospital";

  // Function to check if patient belongs to the same hospital
  const belongsToUserHospital = (patient) =>
    Array.isArray(patient.hospital) &&
    patient.hospital.some((hosp) => hosp === userHospital);

  // Fetch DB Data and Filter by Hospital (Checking Inside Array)
  const diabetesPatients = DiabetesPatients().filter(belongsToUserHospital);
  const hypertensionPatients = HypertensionPatients().filter(
    belongsToUserHospital
  );
  const asthmaPatients = AsthmaPatients().filter(belongsToUserHospital);

  const countPatients = (patients, condition) =>
    patients.filter(condition).length;

  // User Info
  const fname = userData?.fname || "Unknown";
  const lname = userData?.lname || "";
  const name = `Dr. ${fname} ${lname}`;
  const title = `${userData?.title || "N/A"} | ${userHospital}`;
  const phone = userData?.phone || "No phone available";
  const email = userData?.email || "No email available";

  // Patient Statistics (Only Patients from the Same Hospital)
  const totalDiabetesPatients = diabetesPatients.length;
  const totalHypertensionPatients = hypertensionPatients.length;
  const totalAsthmaPatients = asthmaPatients.length;
  const AllPatients =
    totalDiabetesPatients + totalHypertensionPatients + totalAsthmaPatients;

  // Calculate Male & Female Counts + Percentage Bars
  const diabetesStats = {
    males: countPatients(
      diabetesPatients,
      (p) => p.gender?.toLowerCase() === "male"
    ),
    malesBar: totalDiabetesPatients
      ? (countPatients(
          diabetesPatients,
          (p) => p.gender?.toLowerCase() === "male"
        ) /
          totalDiabetesPatients) *
        100
      : 0,
    females: countPatients(
      diabetesPatients,
      (p) => p.gender?.toLowerCase() === "female"
    ),
    femalesBar: totalDiabetesPatients
      ? (countPatients(
          diabetesPatients,
          (p) => p.gender?.toLowerCase() === "female"
        ) /
          totalDiabetesPatients) *
        100
      : 0,
    hiv: countPatients(diabetesPatients, (p) => p.hiv.at(-1) === true),
    hivBar: totalDiabetesPatients
      ? (countPatients(diabetesPatients, (p) => p.hiv.at(-1) === true) /
          totalDiabetesPatients) *
        100
      : 0,
    htn: countPatients(diabetesPatients, (p) => p.htn.at(-1) === true),
    htnBar: totalDiabetesPatients
      ? (countPatients(diabetesPatients, (p) => p.htn.at(-1) === true) /
          totalDiabetesPatients) *
        100
      : 0,
  };

  const hypertensionStats = {
    males: countPatients(
      hypertensionPatients,
      (p) => p.gender?.toLowerCase() === "male"
    ),
    malesBar: totalHypertensionPatients
      ? (countPatients(
          hypertensionPatients,
          (p) => p.gender?.toLowerCase() === "male"
        ) /
          totalHypertensionPatients) *
        100
      : 0,
    females: countPatients(
      hypertensionPatients,
      (p) => p.gender?.toLowerCase() === "female"
    ),
    femalesBar: totalHypertensionPatients
      ? (countPatients(
          hypertensionPatients,
          (p) => p.gender?.toLowerCase() === "female"
        ) /
          totalHypertensionPatients) *
        100
      : 0,
    hiv: countPatients(hypertensionPatients, (p) => p.hiv.at(-1) === true),
    hivBar: totalHypertensionPatients
      ? (countPatients(hypertensionPatients, (p) => p.hiv.at(-1) === true) /
          totalHypertensionPatients) *
        100
      : 0,
    kd: countPatients(
      hypertensionPatients,
      (p) => p.proteinuria.at(-1) === true
    ),
    kdBar: totalHypertensionPatients
      ? (countPatients(
          hypertensionPatients,
          (p) => p.proteinuria.at(-1) === true
        ) /
          totalHypertensionPatients) *
        100
      : 0,
  };

  const asthmaStats = {
    males: countPatients(
      asthmaPatients,
      (p) => p.gender?.toLowerCase() === "male"
    ),
    malesBar: totalAsthmaPatients
      ? (countPatients(
          asthmaPatients,
          (p) => p.gender?.toLowerCase() === "male"
        ) /
          totalAsthmaPatients) *
        100
      : 0,
    females: countPatients(
      asthmaPatients,
      (p) => p.gender?.toLowerCase() === "female"
    ),
    femalesBar: totalAsthmaPatients
      ? (countPatients(
          asthmaPatients,
          (p) => p.gender?.toLowerCase() === "female"
        ) /
          totalAsthmaPatients) *
        100
      : 0,
    hiv: countPatients(asthmaPatients, (p) => p.hiv.at(-1) === true),
    hivBar: totalAsthmaPatients
      ? (countPatients(asthmaPatients, (p) => p.hiv.at(-1) === true) /
          totalAsthmaPatients) *
        100
      : 0,
    obese: countPatients(asthmaPatients, (p) => p.obese === true),
    obeseBar: totalAsthmaPatients
      ? (countPatients(asthmaPatients, (p) => p.obese === true) /
          totalAsthmaPatients) *
        100
      : 0,
  };

  const stats = {
    diabetes: diabetesStats,
    hypertension: hypertensionStats,
    asthma: asthmaStats,
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name={name}
          job={title}
          email={email}
          phone={phone}
          patients={AllPatients}
          dbpatients={totalDiabetesPatients}
          htpatients={totalHypertensionPatients}
          asmpatients={totalAsthmaPatients}
        />
        <GeneralInformation stats={stats} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <AppointmentTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
