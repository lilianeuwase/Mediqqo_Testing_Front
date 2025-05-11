import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Button,
} from "@chakra-ui/react";
import SaveButton from "../../../../../../common/buttons/saveButton";

export default function EditVitalsModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const calculateBmi = () => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    if (!isNaN(height) && height > 0 && !isNaN(weight)) {
      return (weight / (height / 100) ** 2).toFixed(2);
    }
    return "";
  };

  const validateFields = () => {
    const newErrors = {};
    const { height, weight, temp, BP, HR, RR, O2 } = formData;

    if (!height) newErrors.height = "Height is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(height))
      newErrors.height = "Height must be a valid number with up to 2 decimals";
    else if (parseFloat(height) < 54 || parseFloat(height) > 280)
      newErrors.height = "Height must be between 54 and 280 cm";

    if (!weight) newErrors.weight = "Weight is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(weight))
      newErrors.weight = "Weight must be a valid number with up to 2 decimals";
    else if (parseFloat(weight) <= 0)
      newErrors.weight = "Weight must be greater than 0";
    else if (parseFloat(weight) > 999)
      newErrors.weight = "Weight can only be 3 digits";

    if (!temp) newErrors.temp = "Temperature is required";
    else if (isNaN(temp) || temp < 35 || temp > 42)
      newErrors.temp = "Temperature must be between 35.0°C and 42.0°C";
    else if (!/^\d+(\.\d{1})?$/.test(temp))
      newErrors.temp = "Temperature must have at most 1 decimal place";

    if (!BP) newErrors.BP = "Blood Pressure is required";
    else if (!/^\d{2,3}\/\d{2,3}$/.test(BP))
      newErrors.BP = "Enter BP in format Systolic/Diastolic (e.g., 120/80)";
    else {
      const [systolic, diastolic] = BP.split("/").map(Number);
      if (systolic < 90 || systolic > 180)
        newErrors.BP = "Systolic BP must be between 90 and 180 mmHg";
      if (diastolic < 60 || diastolic > 120)
        newErrors.BP = "Diastolic BP must be between 60 and 120 mmHg";
    }

    if (!HR) newErrors.HR = "Heart Rate is required";
    else if (isNaN(HR) || HR < 40 || HR > 200)
      newErrors.HR = "Heart Rate must be between 40 and 200 bpm";

    if (!RR) newErrors.RR = "Respiratory Rate is required";
    else if (isNaN(RR) || RR < 10 || RR > 40)
      newErrors.RR = "Respiratory Rate must be between 10 and 40 breaths/min";

    if (!O2) newErrors.O2 = "Oxygen Saturation is required";
    else if (isNaN(O2) || O2 < 70 || O2 > 100)
      newErrors.O2 = "Oxygen Saturation must be between 70% and 100%";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    setIsSaving(true);
    try {
      const bmi = calculateBmi();
      const updatedData = { ...formData, bmi };
      await onSave(updatedData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Vital Signs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="4">
            <Box>
              <Text fontWeight="bold">Date of Vitals:</Text>
              <Text>{formData.vitalsDates}</Text>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isInvalid={errors.height}>
                  <FormLabel>Height (cm) *</FormLabel>
                  <Input
                    value={formData.height || ""}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    variant="flushed"
                  />
                  {errors.height && <FormErrorMessage>{errors.height}</FormErrorMessage>}
                </FormControl>
                <FormControl mt="4" isInvalid={errors.temp}>
                  <FormLabel>Temperature (°C) *</FormLabel>
                  <Input
                    value={formData.temp || ""}
                    onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                    variant="flushed"
                  />
                  {errors.temp && <FormErrorMessage>{errors.temp}</FormErrorMessage>}
                </FormControl>
                <FormControl mt="4" isInvalid={errors.BP}>
                  <FormLabel>Blood Pressure (mmHg) *</FormLabel>
                  <Input
                    value={formData.BP || ""}
                    onChange={(e) => setFormData({ ...formData, BP: e.target.value })}
                    variant="flushed"
                  />
                  {errors.BP && <FormErrorMessage>{errors.BP}</FormErrorMessage>}
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={errors.weight}>
                  <FormLabel>Weight (kg) *</FormLabel>
                  <Input
                    value={formData.weight || ""}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    variant="flushed"
                  />
                  {errors.weight && <FormErrorMessage>{errors.weight}</FormErrorMessage>}
                </FormControl>
                <FormControl mt="4" isInvalid={errors.HR}>
                  <FormLabel>Heart Rate (bpm) *</FormLabel>
                  <Input
                    value={formData.HR || ""}
                    onChange={(e) => setFormData({ ...formData, HR: e.target.value })}
                    variant="flushed"
                  />
                  {errors.HR && <FormErrorMessage>{errors.HR}</FormErrorMessage>}
                </FormControl>
                <FormControl mt="4" isInvalid={errors.RR}>
                  <FormLabel>Respiratory Rate (breaths/min) *</FormLabel>
                  <Input
                    value={formData.RR || ""}
                    onChange={(e) => setFormData({ ...formData, RR: e.target.value })}
                    variant="flushed"
                  />
                  {errors.RR && <FormErrorMessage>{errors.RR}</FormErrorMessage>}
                </FormControl>
              </GridItem>
            </Grid>

            <Flex gap="4" mt="4">
              <FormControl isInvalid={errors.O2}>
                <FormLabel>Oxygen Saturation (SaO₂ %) *</FormLabel>
                <Input
                  value={formData.O2 || ""}
                  onChange={(e) => setFormData({ ...formData, O2: e.target.value })}
                  variant="flushed"
                />
                {errors.O2 && <FormErrorMessage>{errors.O2}</FormErrorMessage>}
              </FormControl>
              <FormControl isReadOnly>
                <FormLabel>BMI</FormLabel>
                <Input value={calculateBmi()} variant="flushed" readOnly />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <SaveButton
            onClick={handleSave}
            isSaving={isSaving}
            text="Save Changes"
            colorScheme="orange"
          />
          <Button variant="outline" colorScheme="red" ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
