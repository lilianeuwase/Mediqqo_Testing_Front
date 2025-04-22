// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../common/components/card/Card";
import React from "react";
import Information from "./Information";

// Assets
export default function GeneralInformation({ stats, ...rest }) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Patients Numbers
      </Text>

      <SimpleGrid columns="4" gap="20px">
        {/* Diabetes Stats */}
        <Information
          boxShadow={cardShadow}
          value={stats.diabetes.males}
          valuebar={stats.diabetes.malesBar}
          title="Diabetic Males"
        />
        <Information
          boxShadow={cardShadow}
          value={stats.diabetes.females}
          valuebar={stats.diabetes.femalesBar}
          title="Diabetic Females"
        />
        <Information
          boxShadow={cardShadow}
          value={stats.diabetes.hiv}
          valuebar={stats.diabetes.hivBar}
          title="Diabetic HIV"
        />
        <Information
          boxShadow={cardShadow}
          value={stats.diabetes.htn}
          valuebar={stats.diabetes.htnBar}
          title="Diabetic Hypertensive"
        />

        {/* Hypertension Stats */}
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={stats.hypertension.males}
          valuebar={stats.hypertension.malesBar}
          title="Hypertensive Males"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={stats.hypertension.females}
          valuebar={stats.hypertension.femalesBar}
          title="Hypertensive Females"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={stats.hypertension.hiv}
          valuebar={stats.hypertension.hivBar}
          title="Hypertensive HIV"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={stats.hypertension.kd}
          valuebar={stats.hypertension.kdBar}
          title="Hypertensive Kidney Disease"
        />

        {/* Asthma Stats */}
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={stats.asthma.males}
          valuebar={stats.asthma.malesBar}
          title="Asthmatic Males"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={stats.asthma.females}
          valuebar={stats.asthma.femalesBar}
          title="Asthmatic Females"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={stats.asthma.obese}
          valuebar={stats.asthma.obeseBar}
          title="Asthmatic Obese"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={stats.asthma.hiv}
          valuebar={stats.asthma.hivBar}
          title="Asthmatic HIV"
        />
      </SimpleGrid>
    </Card>
  );
}