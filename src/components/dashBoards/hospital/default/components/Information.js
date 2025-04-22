// Chakra imports
import { Box, Text, useColorModeValue, Flex, Progress } from "@chakra-ui/react";
// Custom components
import Card from "../../../common/components/card/Card";
import React from "react";

export default function Information(props) {
  const { title, value, valuebar, barcolor, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest}>
      <Box>
        <Text fontWeight="500" color={textColorSecondary} fontSize="11.5px">
          {title}
        </Text>
        <Text color={textColorPrimary} fontWeight="500" fontSize="md">
          {value}
          <Flex align="center">
            <Progress
              variant="table"
              colorScheme={barcolor}
              h="8px"
              w="108px"
              value={valuebar}
            />
          </Flex>
        </Text>
      </Box>
    </Card>
  );
}
