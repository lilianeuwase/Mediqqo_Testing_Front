import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CurrentHistory({ formData, setFormData }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  const handleCheckboxChange = (category, key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: e.target.checked,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="700" mb="4" color={textColorPrimary}>
        Current Patient History
      </Text>
      <SimpleGrid columns={1} spacing={6}>
        {/* Clinical Symptoms */}
        <Box>
          <Text fontWeight="bold" mb="2" color={textColor}>
            Clinical Symptoms
          </Text>
          <Flex gap="10px" wrap="wrap">
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.clinicalSympChecked.polyuria}
              onChange={handleCheckboxChange("clinicalSympChecked", "polyuria")}
            >
              Polyuria
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.clinicalSympChecked.polydipsia}
              onChange={handleCheckboxChange(
                "clinicalSympChecked",
                "polydipsia"
              )}
            >
              Polydipsia
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.clinicalSympChecked.polyphagia}
              onChange={handleCheckboxChange(
                "clinicalSympChecked",
                "polyphagia"
              )}
            >
              Polyphagia
            </Checkbox>
          </Flex>
          <FormControl mt="4">
            <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
              Additional Clinical Symptoms (comma separated)
            </FormLabel>
            <Input
              name="additionalClinicalSymp"
              value={formData.additionalClinicalSymp}
              onChange={handleInputChange}
              variant="flushed"
              fontSize="sm"
            />
          </FormControl>
        </Box>

        {/* Danger Signs */}
        <Box>
          <Text fontWeight="bold" mb="2" color={textColor}>
            Danger Signs
          </Text>
          <Flex gap="10px" wrap="wrap">
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.dangerSignsChecked.hydra}
              onChange={handleCheckboxChange("dangerSignsChecked", "hydra")}
            >
              Dehydration
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.dangerSignsChecked.abspain}
              onChange={handleCheckboxChange("dangerSignsChecked", "abspain")}
            >
              Abdominal Pain
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.dangerSignsChecked.hypo}
              onChange={handleCheckboxChange("dangerSignsChecked", "hypo")}
            >
              Hypoglycemia
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.dangerSignsChecked.sighing}
              onChange={handleCheckboxChange("dangerSignsChecked", "sighing")}
            >
              Shortness of Breath
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.dangerSignsChecked.confusion}
              onChange={handleCheckboxChange("dangerSignsChecked", "confusion")}
            >
              Confusion
            </Checkbox>
          </Flex>
          <FormControl mt="4">
            <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
              Additional Danger Signs (comma separated)
            </FormLabel>
            <Input
              name="additionalDangerSigns"
              value={formData.additionalDangerSigns}
              onChange={handleInputChange}
              variant="flushed"
              fontSize="sm"
            />
          </FormControl>
        </Box>

        {/* Complications */}
        <Box>
          <Text fontWeight="bold" mb="2" color={textColor}>
            Complications
          </Text>
          <Flex gap="10px" wrap="wrap">
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.complicationsChecked.retino}
              onChange={handleCheckboxChange("complicationsChecked", "retino")}
            >
              Retinopathy
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.complicationsChecked.nephro}
              onChange={handleCheckboxChange("complicationsChecked", "nephro")}
            >
              Nephropathy
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.complicationsChecked.neuro}
              onChange={handleCheckboxChange("complicationsChecked", "neuro")}
            >
              Neuropathy
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.complicationsChecked.footulcer}
              onChange={handleCheckboxChange(
                "complicationsChecked",
                "footulcer"
              )}
            >
              Foot Ulcer
            </Checkbox>
          </Flex>
          <FormControl mt="4">
            <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
              Additional Complications (comma separated)
            </FormLabel>
            <Input
              name="additionalComplications"
              value={formData.additionalComplications}
              onChange={handleInputChange}
              variant="flushed"
              fontSize="sm"
            />
          </FormControl>
        </Box>

        {/* Co-Morbidities */}
        <Box>
          <Text fontWeight="bold" mb="2" color={textColor}>
            Co-Morbidities
          </Text>
          <Flex gap="10px" wrap="wrap">
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.comorbiditiesChecked.hiv}
              onChange={handleCheckboxChange("comorbiditiesChecked", "hiv")}
            >
              HIV
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.comorbiditiesChecked.htn}
              onChange={handleCheckboxChange("comorbiditiesChecked", "htn")}
            >
              Hypertension
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.comorbiditiesChecked.liver}
              onChange={handleCheckboxChange("comorbiditiesChecked", "liver")}
            >
              Liver Disease
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={formData?.comorbiditiesChecked.prego}
              onChange={handleCheckboxChange("comorbiditiesChecked", "prego")}
            >
              Pregnant
            </Checkbox>
          </Flex>
          <FormControl mt="4">
            <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
              Additional Co-Morbidities (comma separated)
            </FormLabel>
            <Input
              name="additionalComorbidities"
              value={formData.additionalComorbidities}
              onChange={handleInputChange}
              variant="flushed"
              fontSize="sm"
            />
          </FormControl>
        </Box>
        {/* Doctor's Comment */}
        <Box mt="6">
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="500" color={textColorPrimary}>
              Doctor's Comment
            </FormLabel>
            <Input
              name="doctor_comment"
              value={formData.doctor_comment}
              onChange={handleInputChange}
              variant="flushed"
              fontSize="sm"
            />
          </FormControl>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
