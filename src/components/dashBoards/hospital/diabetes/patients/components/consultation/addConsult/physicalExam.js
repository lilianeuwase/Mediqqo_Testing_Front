import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Checkbox,
  Textarea,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function PhysicalExam({ formData, setFormData }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const handlePainScoreChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      painEvaluation: {
        ...prev.painEvaluation,
        [field]: value,
      },
    }));
  };

  const handleExamChange = (section, type, updated) => {
    setFormData((prev) => ({
      ...prev,
      systematicExam: {
        ...prev.systematicExam,
        [section]: {
          ...prev.systematicExam?.[section],
          [type]: updated,
        },
      },
    }));
  };

  const examSections = [
    {
      name: "General",
      normal: ["Well-appearing"],
      abnormal: [
        "Cachectic",
        "Use of accessory muscles",
        "Dehydrated",
        "Others (specify)",
      ],
    },
    {
      name: "Head and Neck (HEENT)",
      normal: ["Normal"],
      abnormal: [
        "High JVP",
        "Cervical mass",
        "Pale conjunctiva",
        "Icteric (jaundiced)",
        "Central cyanosis",
        "Lymphadenopathy (specify if yes, location)",
      ],
    },
    {
      name: "Chest (Thorax)",
      normal: ["Normal"],
      abnormal: [
        "Deformation",
        "Scar (specify location)",
        "Collateral circulation",
        "Gynecomastia",
        "Kyphoscoliosis",
        "Buffalo neck",
        "Chest expansion abnormality",
      ],
    },
    {
      name: "Breast (Chest)",
      normal: ["Normal"],
      abnormal: ["Asymmetry", "Discoloration", "Mass", "Lesion"],
    },
    {
      name: "Lungs",
      normal: ["Clear"],
      abnormal: [
        "Dullness",
        "Hyperresonance",
        "Crackles (specify if yes, location)",
        "Wheezing",
      ],
    },
    // 🔥 New Sections
    {
      name: "Heart",
      normal: [
        "Normal Point of Maximal Impulse (PMI)",
        "Regular rhythm",
        "Normal S1 and S2 sounds",
      ],
      abnormal: [
        "Tachycardia",
        "Irregular rhythm",
        "PMI displaced",
        "Murmur (specify location)",
        "Muffled heart sounds",
        "Distant heart sounds",
      ],
    },
    {
      name: "Abdomen",
      normal: [
        "Soft",
        "Non-tender",
        "No hepatomegaly",
        "No splenomegaly",
        "No ascites",
      ],
      abnormal: [
        "Distension",
        "Surgical scar",
        "Collateral circulation",
        "Swelling",
        "Splenomegaly (specify cm)",
        "Hepatomegaly (specify cm)",
        "Pulsatile liver",
        "Ascites (Mild, Moderate, Abundant)",
        "Tenderness (specify area: HCD, RUQ, HCGL, LUQ, FID, RLQ, FIGL, LLQ)",
        "Defense (guarding)",
        "Abnormal auscultation (renal artery stenosis, AAA)",
      ],
    },
    {
      name: "Genital",
      normal: ["Normal"],
      abnormal: [
        "Swelling",
        "Mass",
        "Bleeding",
        "Pain",
        "Lesion",
        "Loss of pubic hair",
        "Asymmetry",
      ],
    },
    {
      name: "Extremities",
      normal: [
        "No peripheral edema",
        "No joint pain or swelling",
        "Palpable pulses (radial, humeral, femoral, popliteal, tibial, pedal)",
      ],
      abnormal: [
        "Cold",
        "Hot",
        "Peripheral edema / swelling",
        "Painful joints",
        "Swollen joints",
        "Radiofemoral pulse delay",
        "Lesions / foot sores",
      ],
    },
    {
      name: "Neuro",
      normal: ["No abnormalities"],
      abnormal: [
        "Focal motor deficit",
        "Sensibility (Exaggerated / Diminished / Absent)",
        "Sensation in feet (specify R/L; 6/6 scale)",
      ],
    },
    {
      name: "Fluid Status (Hemodynamics)",
      normal: ["Euvolemia"],
      abnormal: ["Hypervolemia", "Hypovolemia"],
    },
  ];
  const isNormalChecked = (section) => {
    return formData.systematicExam?.[section]?.normal?.length > 0;
  };

  const isAbnormalChecked = (section) => {
    return formData.systematicExam?.[section]?.abnormal?.length > 0;
  };

  const handleSpecifyInputChange = (section, type, base, value) => {
    const current = formData.systematicExam?.[section]?.[type] || [];
    const filtered = current.filter((item) => !item.startsWith(base));
    const newEntry = value ? `${base}: ${value}` : base;
    handleExamChange(section, type, [...filtered, newEntry]);
  };

  return (
    <Box>
      {/* Pain Evaluation Section */}
      <Text fontSize="xl" fontWeight="700" mb="4" color={textColor}>
        Pain Evaluation
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" mb="6">
        <FormControl mb="12px">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="4px"
          >
            Physical Pain Score (0-10)
          </FormLabel>
          <Input
            type="number"
            value={formData.painEvaluation?.physical || ""}
            fontSize="sm"
            size="sm"
            variant="flushed"
            onChange={(e) => handlePainScoreChange("physical", e.target.value)}
          />
          {/* You can add errors here if you have validation later */}
        </FormControl>

        <FormControl mb="12px">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="4px"
          >
            Psychological Pain Score (0-10)
          </FormLabel>
          <Input
            type="number"
            value={formData.painEvaluation?.psychological || ""}
            fontSize="sm"
            size="sm"
            variant="flushed"
            onChange={(e) =>
              handlePainScoreChange("psychological", e.target.value)
            }
          />
        </FormControl>

        <FormControl mb="12px">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="4px"
          >
            Spiritual Pain Score (0-10)
          </FormLabel>
          <Input
            type="number"
            value={formData.painEvaluation?.spiritual || ""}
            fontSize="sm"
            size="sm"
            variant="flushed"
            onChange={(e) => handlePainScoreChange("spiritual", e.target.value)}
          />
        </FormControl>
      </SimpleGrid>
      <Textarea
        placeholder="Comment on the patient's pain evaluation"
        value={formData.painEvaluation?.comment || ""}
        onChange={(e) => handlePainScoreChange("comment", e.target.value)}
        mb="10"
        variant="flushed"
      />

      {/* Systematic Physical Examination Section */}
      <Text fontSize="xl" fontWeight="700" mb="4" color={textColor}>
        Systematic Physical Examination
      </Text>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Section</Th>
              <Th>Normal Findings</Th>
              <Th>Abnormal Findings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {examSections.map((section, idx) => (
              <Tr key={idx}>
                <Td>
                  <Text>{section.name}</Text>
                </Td>
                <Td>
                  <Flex direction="column">
                    {section.normal.map((finding, i) => (
                      <Checkbox
                        key={i}
                        colorScheme="purple"
                        isDisabled={isAbnormalChecked(section.name)}
                        isChecked={formData?.systematicExam?.[
                          section.name
                        ]?.normal?.includes(finding)}
                        onChange={(e) => {
                          const current =
                            formData.systematicExam?.[section.name]?.normal ||
                            [];
                          const updated = e.target.checked
                            ? [...current, finding]
                            : current.filter((item) => item !== finding);
                          handleExamChange(section.name, "normal", updated);
                        }}
                      >
                        {finding}
                      </Checkbox>
                    ))}
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="column">
                    {section.abnormal.map((finding, i) => (
                      <Box key={i}>
                        <Checkbox
                          colorScheme="red"
                          isDisabled={isNormalChecked(section.name)}
                          isChecked={formData?.systematicExam?.[
                            section.name
                          ]?.abnormal?.some((item) => item.startsWith(finding))}
                          onChange={(e) => {
                            const current =
                              formData.systematicExam?.[section.name]
                                ?.abnormal || [];
                            if (e.target.checked) {
                              handleExamChange(section.name, "abnormal", [
                                ...current,
                                finding,
                              ]);
                            } else {
                              handleExamChange(
                                section.name,
                                "abnormal",
                                current.filter(
                                  (item) => !item.startsWith(finding)
                                )
                              );
                            }
                          }}
                        >
                          {finding}
                        </Checkbox>
                        {finding.includes("specify") &&
                          formData.systematicExam?.[
                            section.name
                          ]?.abnormal?.some((item) =>
                            item.startsWith(finding)
                          ) && (
                            <Input
                              mt="2"
                              placeholder="Specify..."
                              size="sm"
                              variant="flushed"
                              onChange={(e) =>
                                handleSpecifyInputChange(
                                  section.name,
                                  "abnormal",
                                  finding,
                                  e.target.value
                                )
                              }
                            />
                          )}
                      </Box>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* Other Section */}
        <Box mt="8">
          <Text fontSize="xl" fontWeight="700" mb="4" color={textColor}>
            Other Section
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Section Name
              </FormLabel>
              <Input
                placeholder="Enter section name (e.g., Musculoskeletal)"
                value={formData.systematicExam?.OtherSection?.name || ""}
                variant="flushed"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    systematicExam: {
                      ...prev.systematicExam,
                      OtherSection: {
                        ...prev.systematicExam?.OtherSection,
                        name: e.target.value,
                      },
                    },
                  }))
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Description
              </FormLabel>
              <Input
                placeholder="Describe observations for this section..."
                value={formData.systematicExam?.OtherSection?.description || ""}
                variant="flushed"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    systematicExam: {
                      ...prev.systematicExam,
                      OtherSection: {
                        ...prev.systematicExam?.OtherSection,
                        description: e.target.value,
                      },
                    },
                  }))
                }
              />
            </FormControl>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

// utils/validators.js
export function validatePainScores(painEvaluation) {
  const scores = painEvaluation || {};
  return ["physical", "psychological", "spiritual"].every((key) => {
    const val = scores[key];
    return val === "" || (Number(val) >= 0 && Number(val) <= 10);
  });
}
