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
    hypermales,
    hyperfemales,
    hypermvaluebar,
    hyperfvaluebar,
    asthmamales,
    asthmafemales,
    asthmamvaluebar,
    asthmafvaluebar,
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

      <SimpleGrid columns="2" gap="20px">
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
          value={hypermales}
          valuebar={hypermvaluebar}
          title="Hypertensive Males"
        />
        <Information
          boxShadow={cardShadow}
          value={hyperfemales}
          valuebar={hyperfvaluebar}
          title="Hypertensive Females"
        />
        <Information
          boxShadow={cardShadow}
          value={asthmamales}
          valuebar={asthmamvaluebar}
          title="Asthmatic Males"
        />
        <Information
          boxShadow={cardShadow}
          value={asthmafemales}
          valuebar={asthmafvaluebar}
          title="Asthmatic Females"
        />
      </SimpleGrid>
    </Card>
  );
}
