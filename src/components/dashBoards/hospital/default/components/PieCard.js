// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../common/components/card/Card.js";
import PieChart from "../../../common/components/charts/PieChart";
import { pieChartOptions } from "../../../common/variables/charts.js";
import React from "react";
import { DiabetesPatients } from "../../../../../DBConnection/DiabetesPatients.js";
import { HypertensionPatients } from "../../../../../DBConnection/HypertensionPatients.js";
import { AsthmaPatients } from "../../../../../DBConnection/AsthmaPatients.js";
export default function Conversion(props) {
  const { ...rest } = props;

  //Data from the DB
  const totalDiabetesPatients = DiabetesPatients().length;
  const totalHypertensionPatients = HypertensionPatients().length;
  const totalAsthmaPatients = AsthmaPatients().length;
  const AllPatients =
    totalDiabetesPatients + totalHypertensionPatients + totalAsthmaPatients;
  const diab =
    AllPatients === 0
      ? 0
      : ((totalDiabetesPatients / AllPatients) * 100).toFixed(1);
  const hyper =
    AllPatients === 0
      ? 0
      : ((totalHypertensionPatients / AllPatients) * 100).toFixed(1);
  const asthma =
    AllPatients === 0
      ? 0
      : ((totalAsthmaPatients / AllPatients) * 100).toFixed(1);
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
      </Flex>

      <PieChart
        h="100%"
        w="100%"
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="0px"
        mx="auto"
      >
        {/* Top row with two items */}
        <Flex direction="row" justify="space-between">
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
          <Flex direction="column" py="5px">
            <Flex align="center">
              <Box h="8px" w="8px" bg="#fa9500" borderRadius="50%" me="4px" />
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
        </Flex>

        {/* Second row with one centered item */}
        <Flex direction="row" justify="center" mt="15px">
          <Flex direction="column" py="5px">
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
        </Flex>
      </Card>
    </Card>
  );
}
