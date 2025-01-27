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
import CheckTable from "../../../views/admin/default/components/CheckTable";
import PieCard from "../../../views/admin/default/components/PieCard";
import { columnsDataCheck } from "../../../views/admin/default/variables/columnsData";
import tableDataCheck from "../../../views/admin/default/variables/tableDataCheck.json";
import General from "./components/General";

//DB Imports
import { DiabetesPatients } from "../../../../../DBConnection/DiabetesPatients";
import { HypertensionPatients } from "../../../../../DBConnection/HypertensionPatients";
import { AsthmaPatients } from "../../../../../DBConnection/AsthmaPatients";
import { UserData } from "../../../../../DBConnection/UserData";

export default function UserReports() {
  //DB Connection

  const fname = UserData().fname;
  const lname = UserData().lname;
  const name = "Dr. " + fname + " " + lname;
  const title = UserData().title + "   |   " + UserData().hospital;
  const phone = UserData().phone;
  const email = UserData().email;

  const diabmales = DiabetesPatients().filter(
    (DiabetesPatients) => DiabetesPatients.gender === "Male"
  ).length;
  const diabfemales = DiabetesPatients().filter(
    (DiabetesPatients) => DiabetesPatients.gender === "Female"
  ).length;
  const hypermales = HypertensionPatients().filter(
    (HypertensionPatients) => HypertensionPatients.gender === "Male"
  ).length;
  const hyperfemales = HypertensionPatients().filter(
    (HypertensionPatients) => HypertensionPatients.gender === "Female"
  ).length;
  const asthmamales = AsthmaPatients().filter(
    (AsthmaPatients) => AsthmaPatients.gender === "Male"
  ).length;
  const asthmafemales = AsthmaPatients().filter(
    (AsthmaPatients) => AsthmaPatients.gender === "Female"
  ).length;

  const totalDiabetesPatients = DiabetesPatients().length;
  const totalHypertensionPatients = HypertensionPatients().length;
  const totalAsthmaPatients = AsthmaPatients().length;
  const AllPatients =
    totalDiabetesPatients + totalHypertensionPatients + totalAsthmaPatients;

  const diabmvaluebar = (diabmales / totalDiabetesPatients) * 100;
  const diabfvaluebar = (diabfemales / totalDiabetesPatients) * 100;
  const hypermvaluebar = (hypermales / totalHypertensionPatients) * 100;
  const hyperfvaluebar = (hyperfemales / totalHypertensionPatients) * 100;
  const asthmamvaluebar = (asthmamales / totalAsthmaPatients) * 100;
  const asthmafvaluebar = (asthmafemales / totalAsthmaPatients) * 100;

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH="365px"
          pe="20px"
          diabmales={diabmales}
          diabmvaluebar={diabmvaluebar}
          diabfemales={diabfemales}
          diabfvaluebar={diabfvaluebar}
          hypermales={hypermales}
          hypermvaluebar={hypermvaluebar}
          hyperfemales={hyperfemales}
          hyperfvaluebar={hyperfvaluebar}
          asthmamales={asthmamales}
          asthmamvaluebar={asthmamvaluebar}
          asthmafemales={asthmafemales}
          asthmafvaluebar={asthmafvaluebar}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />{" "}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
