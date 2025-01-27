// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import PieChart from "../../../../components/charts/PieChart";
import { pieChartOptions } from "../../../../variables/charts";
import { VSeparator } from "../../../../components/separator/Separator";
import React from "react";
import { DiabetesPatients } from "../../../../../../DBConnection/DiabetesPatients";
import { HypertensionPatients } from "../../../../../../DBConnection/HypertensionPatients.js";
import { AsthmaPatients } from "../../../../../../DBConnection/AsthmaPatients.js";
export default function Conversion(props) {
  const { ...rest } = props;

  //Data from the DB
  const totalDiabetesPatients = DiabetesPatients().length;
  const totalHypertensionPatients = HypertensionPatients().length;
  const totalAsthmaPatients = AsthmaPatients().length;
  const AllPatients =
    totalDiabetesPatients + totalHypertensionPatients + totalAsthmaPatients;
  const diab = ((totalDiabetesPatients / AllPatients) * 100).toFixed(1);
  const hyper = ((totalHypertensionPatients / AllPatients) * 100).toFixed(1);
  const asthma = ((totalAsthmaPatients / AllPatients) * 100).toFixed(1);
  var pieChartData = [
    totalDiabetesPatients,
    totalHypertensionPatients,
    totalAsthmaPatients,
  ];
  var pieChartData1 = [31, 32, 33];
  console.log(pieChartData);
  console.log(pieChartData1);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          NCD Patients Pie Chart Across Mediqqo
        </Text>
        {/* <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select> */}
      </Flex>

      <PieChart
        h="100%"
        w="100%"
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#4318FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Diabetes
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {diab}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "20px", "2xl": "10px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Hypertension
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {hyper}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "20px", "2xl": "10px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#12c9bb" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Asthma
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {asthma}%
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}
