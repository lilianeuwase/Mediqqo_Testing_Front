// AdditionalInfo.js
import React from "react";
import {
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  FormErrorMessage,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import { HSeparator } from "../../../../components/separator/Separator";

const AdditionalInfo = ({
  doctor_comment, setDoctorComment,
  state, handleCheckboxChange,
  errors,
  handlePrevious,
}) => {
  // Checkbox style with custom tick color orange (#fa9500)
  const checkboxProps = {
    colorScheme: "orange",
    _checked: { bg: "#fa9500", borderColor: "#fa9500" },
  };

  return (
    <Card
      mb={{ base: "0px", "2xl": "20px" }}
      pe="20px"
      pt={{ base: "130px", md: "80px", xl: "50px" }}
      pb={{ base: "130px", md: "80px", xl: "50px" }}
      pr={{ base: "130px", md: "80px", xl: "80px" }}
      pl={{ base: "130px", md: "80px", xl: "80px" }}
    >
      <Text color="inherit" fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
        Patient Registration / Diabetes
      </Text>
      <Flex align="center" mb="10px" mt="10px">
        <HSeparator />
      </Flex>
      <Text color="inherit" fontWeight="bold" fontSize="xl" mt="10px" mb="20px">
        Additional Information
      </Text>
      <SimpleGrid columns="2" gap="20px">
        {/* Clinical Symptoms */}
        <Box gridColumn="span 2">
          <Text color="inherit" fontWeight="bold" fontSize="lg" mt="10px" mb="4px">
            Clinical Symptoms
          </Text>
        </Box>
        <Checkbox name="polyuria" isChecked={state.polyuria} onChange={handleCheckboxChange} {...checkboxProps}>
          Polyuria
        </Checkbox>
        <Checkbox name="polydipsia" isChecked={state.polydipsia} onChange={handleCheckboxChange} {...checkboxProps}>
          Polydipsia
        </Checkbox>
        <Checkbox name="polyphagia" isChecked={state.polyphagia} onChange={handleCheckboxChange} {...checkboxProps}>
          Polyphagia
        </Checkbox>

        {/* Danger Signs */}
        <Box gridColumn="span 2" mt="20px">
          <Text color="inherit" fontWeight="bold" fontSize="lg" mt="10px" mb="4px">
            Danger Signs
          </Text>
        </Box>
        <Checkbox name="hydra" isChecked={state.hydra} onChange={handleCheckboxChange} {...checkboxProps}>
          Dehydration
        </Checkbox>
        <Checkbox name="abspain" isChecked={state.abspain} onChange={handleCheckboxChange} {...checkboxProps}>
          Abdominal Pain
        </Checkbox>
        <Checkbox name="hypo" isChecked={state.hypo} onChange={handleCheckboxChange} {...checkboxProps}>
          Hypoglycemia
        </Checkbox>
        <Checkbox name="sighing" isChecked={state.sighing} onChange={handleCheckboxChange} {...checkboxProps}>
          Shortness of Breath
        </Checkbox>
        <Checkbox name="confusion" isChecked={state.confusion} onChange={handleCheckboxChange} {...checkboxProps}>
          Confusion
        </Checkbox>

        {/* Complications */}
        <Box gridColumn="span 2" mt="20px">
          <Text color="inherit" fontWeight="bold" fontSize="lg" mt="10px" mb="4px">
            Complications
          </Text>
        </Box>
        <Checkbox name="retino" isChecked={state.retino} onChange={handleCheckboxChange} {...checkboxProps}>
          Retinopathy
        </Checkbox>
        <Checkbox name="nephro" isChecked={state.nephro} onChange={handleCheckboxChange} {...checkboxProps}>
          Nephropathy
        </Checkbox>
        <Checkbox name="neuro" isChecked={state.neuro} onChange={handleCheckboxChange} {...checkboxProps}>
          Neuropathy
        </Checkbox>
        <Checkbox name="footulcer" isChecked={state.footulcer} onChange={handleCheckboxChange} {...checkboxProps}>
          Foot Ulcer
        </Checkbox>

        {/* Co-morbidities */}
        <Box gridColumn="span 2" mt="20px">
          <Text color="inherit" fontWeight="bold" fontSize="lg" mt="10px" mb="4px">
            Co-morbidities
          </Text>
        </Box>
        <Checkbox name="hiv" isChecked={state.hiv} onChange={handleCheckboxChange} {...checkboxProps}>
          HIV
        </Checkbox>
        <Checkbox name="htn" isChecked={state.htn} onChange={handleCheckboxChange} {...checkboxProps}>
          Hypertension
        </Checkbox>
        <Checkbox name="liver" isChecked={state.liver} onChange={handleCheckboxChange} {...checkboxProps}>
          Liver Disease
        </Checkbox>
        <Checkbox name="prego" isChecked={state.prego} onChange={handleCheckboxChange} {...checkboxProps}>
          Pregnancy
        </Checkbox>

        <FormControl mt="24px" gridColumn="span 2">
          <FormLabel fontSize="sm" fontWeight="500" color="inherit">
            Doctor's Comment
          </FormLabel>
          <Input
            value={doctor_comment}
            fontSize="sm"
            type="text"
            variant="flushed"
            onChange={(e) => setDoctorComment(e.target.value)}
          />
        </FormControl>
      </SimpleGrid>
      <Flex align="center" justify="space-between">
        <Button variant="brand" fontWeight="500" fontSize="16px" py="20px" px="27" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="brand" fontWeight="500" fontSize="16px" py="20px" px="27" type="submit">
          Submit
        </Button>
      </Flex>
    </Card>
  );
};

export default AdditionalInfo;