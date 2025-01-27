import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { MediqqoLogo } from "../../../components/icons/Icons";
import { HSeparator } from "../../../components/separator/Separator";
import Logo from "../../../../../components/comps/logo";
import { MDBIcon } from "mdb-react-ui-kit";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("brand.300", "white");

  return (
    <Flex align="center" direction="column">
      <div className="logo">
        <h1 style={{ color: "#18b9ab" }}>
          <MDBIcon
            fas
            icon="fa-duotone fa-capsules"
            // style={{ color: "#18b9ab" }}
            size="1/2x"
          />
          MEDIQQO
        </h1>
      </div>
      {/* <MediqqoLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <HSeparator mb="20px" mt="20px" />
    </Flex>
  );
}

export default SidebarBrand;
