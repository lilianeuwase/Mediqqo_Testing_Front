import React from "react";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

export default function PastHistory({ formData, setFormData }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const handleCheckboxChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.checked,
    }));
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1 }} spacing={4}>
        {/* Patient Medical History */}
        <Box>
          <FormLabel fontSize="md" color={textColorPrimary}>
            Patient Medical History
          </FormLabel>
          <Flex wrap="wrap" gap={4}>
            <Checkbox
              isChecked={formData?.tonsilitis}
              onChange={handleCheckboxChange("tonsilitis")}
            >
              Tonsilitis
            </Checkbox>
            <Checkbox
              isChecked={formData?.previousHospitalAdmission}
              onChange={handleCheckboxChange("previousHospitalAdmission")}
            >
              Previous Hospital Admission
            </Checkbox>
            <Checkbox
              isChecked={formData?.smoker}
              onChange={handleCheckboxChange("smoker")}
            >
              Former/Current Smoker
            </Checkbox>
            <Checkbox
              isChecked={formData?.alcohol}
              onChange={handleCheckboxChange("alcohol")}
            >
              Former/Current Heavy Alcohol Consumption
            </Checkbox>
            <Checkbox
              isChecked={formData?.undernutrition}
              onChange={handleCheckboxChange("undernutrition")}
            >
              History of Undernutrition
            </Checkbox>
          </Flex>
        </Box>

        {/* Surgical History */}
        <FormControl>
          <FormLabel fontSize="md" color={textColorPrimary} mt={5}>
            Surgical History
            <Box as="span" color="gray.500" fontSize="sm">
              {" "}
              (e.g., Cardiac, etc.)
            </Box>
          </FormLabel>
          <Textarea
            value={formData.surgicalHistory}
            onChange={handleInputChange("surgicalHistory")}
            variant="flushed"
            placeholder="Type here..."
          />
        </FormControl>

        {/* Obstetrical History */}
        <FormControl>
          <FormLabel fontSize="md" color={textColorPrimary} mt={5}>
            Obstetrical History
            <Box as="span" color="gray.500" fontSize="sm">
              {" "}
              (including FP)
            </Box>
          </FormLabel>
          <Textarea
            value={formData.obstetricalHistory}
            onChange={handleInputChange("obstetricalHistory")}
            variant="flushed"
            placeholder="Type here..."
          />
        </FormControl>

        {/* Family History */}
        <Box>
          <FormLabel fontSize="md" color={textColorPrimary} mt={5}>
            Family History
            <Box as="span" color="gray.500" fontSize="sm">
              {" "}
              (alcohol, physical inactivity, hx of chronic disease, etc.)
            </Box>
          </FormLabel>
          <Flex wrap="wrap" gap={4}>
            <Checkbox
              isChecked={formData?.familyHistory}
              onChange={handleCheckboxChange("familyHistory")}
            >
              Any member suffered from: HD, HTN, Stroke, Obesity, Asthma, DM,
              KD, Cancer
            </Checkbox>
          </Flex>

          {/* Ubudehe Class Field */}
          <FormControl mt="4">
            <FormLabel fontSize="sm" color={textColorPrimary}>
              Ubudehe Class
            </FormLabel>
            <Input
              variant="flushed"
              value={formData.ubudeheClass || ""}
              onChange={handleInputChange("ubudeheClass")}
              placeholder="Specify Ubudehe Class"
              size="sm"
            />
          </FormControl>
        </Box>

        {/* Medications */}
        <Box>
          <FormLabel fontSize="md" color={textColorPrimary} mt={5}>
            Medications
            <Box as="span" color="gray.500" fontSize="sm">
              {" "}
              (including traditional medications/practices)
            </Box>
          </FormLabel>
          <Flex wrap="wrap" gap={4}>
            <Checkbox
              isChecked={formData?.medCVD}
              onChange={handleCheckboxChange("medCVD")}
            >
              CVD
            </Checkbox>
            <Checkbox
              isChecked={formData?.medDM}
              onChange={handleCheckboxChange("medDM")}
            >
              DM
            </Checkbox>
            <Checkbox
              isChecked={formData?.medCRD}
              onChange={handleCheckboxChange("medCRD")}
            >
              CRD
            </Checkbox>
            <Checkbox
              isChecked={formData?.medTB}
              onChange={handleCheckboxChange("medTB")}
            >
              TB Drugs
            </Checkbox>
            <Checkbox
              isChecked={formData?.medHIV}
              onChange={handleCheckboxChange("medHIV")}
            >
              HIV
            </Checkbox>
            <Checkbox
              isChecked={formData?.medContraceptives}
              onChange={handleCheckboxChange("medContraceptives")}
            >
              Contraceptives
            </Checkbox>
          </Flex>

          <Input
            mt="2"
            variant="flushed"
            placeholder="Other Medications (if any)"
            value={formData.medOthers}
            onChange={handleInputChange("medOthers")}
          />
        </Box>

        {/* Allergy to Medication */}
        <Box>
          <FormLabel fontSize="md" color={textColorPrimary} mt={5}>
            Allergy to Medication
            <Box as="span" color="gray.500" fontSize="sm">
              {" "}
              (Yes/No, if yes specify)
            </Box>
          </FormLabel>
          <Flex gap={4}>
            <Checkbox
              isChecked={formData?.allergyYes}
              onChange={handleCheckboxChange("allergyYes")}
            >
              Yes
            </Checkbox>
            <Checkbox
              isChecked={formData?.allergyNo}
              onChange={handleCheckboxChange("allergyNo")}
            >
              No
            </Checkbox>
          </Flex>

          {formData.allergyYes && (
            <Input
              mt="2"
              variant="flushed"
              placeholder="Specify Allergy"
              value={formData.allergyDetails}
              onChange={handleInputChange("allergyDetails")}
            />
          )}
        </Box>

        {/* Other Relevant History */}
        <FormControl>
          <FormLabel fontSize="md" color={textColorPrimary} mt={5}>
            Other Relevant History
          </FormLabel>
          <Textarea
            value={formData.otherRelevantHistory}
            onChange={handleInputChange("otherRelevantHistory")}
            variant="flushed"
            placeholder="Type here..."
          />
        </FormControl>
      </SimpleGrid>
    </Box>
  );
}
