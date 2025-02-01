// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card";
import React from "react";
import Information from "./Information";

// Assets
export default function GeneralInformation(props) {
  const {
    diabmales,
    diabfemales,
    diabmvaluebar,
    diabfvaluebar,
    diabhiv,
    diabhivvaluebar,
    diabhtn,
    diabhtnvaluebar,
    hypermales,
    hyperfemales,
    hypermvaluebar,
    hyperfvaluebar,
    hyperhiv,
    hyperhivvaluebar,
    hyperkd,
    hyperkdvaluebar,
    asthmamales,
    asthmafemales,
    asthmamvaluebar,
    asthmafvaluebar,
    asthmaobese,
    asthmaobesevaluebar,
    asthmahiv,
    asthmahivvaluebar,
    ...rest
  } = props;

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
        <Information
          boxShadow={cardShadow}
          value={diabmales}
          valuebar={diabmvaluebar}
          title="Diabetic Males"
        />
        <Information
          boxShadow={cardShadow}
          value={diabfemales}
          valuebar={diabfvaluebar}
          title="Diabetic Females"
        />
        <Information
          boxShadow={cardShadow}
          value={diabhiv}
          valuebar={diabhivvaluebar}
          title="Diabetic HIV"
        />
        <Information
          boxShadow={cardShadow}
          value={diabhtn}
          valuebar={diabhtnvaluebar}
          title="Diabetic Hypertensive"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={hypermales}
          valuebar={hypermvaluebar}
          title="Hypertensive Males"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={hyperfemales}
          valuebar={hyperfvaluebar}
          title="Hypertensive Females"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={hyperhiv}
          valuebar={hyperhivvaluebar}
          title="Hypertensive HIV"
        />
        <Information
          barcolor="orange"
          boxShadow={cardShadow}
          value={hyperkd}
          valuebar={hyperkdvaluebar}
          title="Hypertensive Kidney Disease"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={asthmamales}
          valuebar={asthmamvaluebar}
          title="Asthmatic Males"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={asthmafemales}
          valuebar={asthmafvaluebar}
          title="Asthmatic Females"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={asthmaobese}
          valuebar={asthmaobesevaluebar}
          title="Asthmatic Obese"
        />
        <Information
          barcolor="brandScheme"
          boxShadow={cardShadow}
          value={asthmahiv}
          valuebar={asthmahivvaluebar}
          title="Asthmatic HIV"
        />
      </SimpleGrid>
    </Card>
  );
}
