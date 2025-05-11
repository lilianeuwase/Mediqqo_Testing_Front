import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import SaveButton from "../../../../../../common/buttons/saveButton";
import { validatePainScores } from "./addConsult/physicalExam";

import CurrentHistory from "./addConsult/currentHistory";
import PastHistory from "./addConsult/pastHistory";
import PhysicalExam from "./addConsult/physicalExam";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

export default function EditConsult({ isOpen, onClose, initialData, onSaved }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [apiHost, setApiHost] = useState("");
  const toast = useToast();
  const patient = DiabPatientData();

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  useEffect(() => {
    if (!initialData) return;

    const past = initialData.pastHistorySummary || {};

    setFormData({
      consultDate: initialData.consultDate || "",
      consultationID: initialData.consultationID,

      // ✅ Current History
      clinicalSympChecked: {
        polyuria: initialData.clinicalSymp?.includes("Polyuria") || false,
        polydipsia: initialData.clinicalSymp?.includes("Polydipsia") || false,
        polyphagia: initialData.clinicalSymp?.includes("Polyphagia") || false,
      },
      additionalClinicalSymp:
        initialData.clinicalSymp
          ?.filter((i) => !["Polyuria", "Polydipsia", "Polyphagia"].includes(i))
          .join(", ") || "",

      dangerSignsChecked: {
        hydra: initialData.dangerSigns?.includes("Dehydration") || false,
        abspain: initialData.dangerSigns?.includes("Abdominal Pain") || false,
        hypo: initialData.dangerSigns?.includes("Hypoglycemia") || false,
        sighing:
          initialData.dangerSigns?.includes("Shortness of Breath") || false,
        confusion: initialData.dangerSigns?.includes("Confusion") || false,
      },
      additionalDangerSigns:
        initialData.dangerSigns
          ?.filter(
            (i) =>
              ![
                "Dehydration",
                "Abdominal Pain",
                "Hypoglycemia",
                "Shortness of Breath",
                "Confusion",
              ].includes(i)
          )
          .join(", ") || "",

      complicationsChecked: {
        retino: initialData.complications?.includes("Retinopathy") || false,
        nephro: initialData.complications?.includes("Nephropathy") || false,
        neuro: initialData.complications?.includes("Neuropathy") || false,
        footulcer: initialData.complications?.includes("Foot Ulcer") || false,
      },
      additionalComplications:
        initialData.complications
          ?.filter(
            (i) =>
              ![
                "Retinopathy",
                "Nephropathy",
                "Neuropathy",
                "Foot Ulcer",
              ].includes(i)
          )
          .join(", ") || "",

      comorbiditiesChecked: {
        hiv: initialData.comorbidities?.includes("HIV") || false,
        htn: initialData.comorbidities?.includes("Hypertension") || false,
        liver: initialData.comorbidities?.includes("Liver Disease") || false,
        prego: initialData.comorbidities?.includes("Pregnant") || false,
      },
      additionalComorbidities:
        initialData.comorbidities
          ?.filter(
            (i) =>
              !["HIV", "Hypertension", "Liver Disease", "Pregnant"].includes(i)
          )
          .join(", ") || "",

      doctor_comment: initialData.doctor_comment || "",

      // ✅ Past History (NEW STRUCTURE)
      tonsilitis: past.patientMedicalHistory?.includes("Tonsilitis") || false,
      previousHospitalAdmission:
        past.patientMedicalHistory?.includes("Previous Hospital Admission") ||
        false,
      smoker:
        past.patientMedicalHistory?.includes("Former/Current Smoker") || false,
      alcohol:
        past.patientMedicalHistory?.includes(
          "Former/Current Alcohol Heavy Consumption"
        ) || false,
      undernutrition:
        past.patientMedicalHistory?.includes("History of Undernutrition") ||
        false,

      surgicalHistory: past.surgicalHistory || "",
      obstetricalHistory: past.obstetricalHistory || "",

      familyHistory: !!past.familyHistory?.summary,
      ubudeheClass: past.familyHistory?.ubudeheClass || "",

      medCVD: past.medications?.checklist?.includes("Medication: CVD") || false,
      medDM: past.medications?.checklist?.includes("Medication: DM") || false,
      medCRD: past.medications?.checklist?.includes("Medication: CRD") || false,
      medTB:
        past.medications?.checklist?.includes("Medication: TB Drugs") || false,
      medHIV: past.medications?.checklist?.includes("Medication: HIV") || false,
      medContraceptives:
        past.medications?.checklist?.includes("Medication: Contraceptives") ||
        false,
      medOthers: past.medications?.others || "",

      allergyYes: past.allergies?.hasAllergy || false,
      allergyNo: past.allergies?.hasAllergy === false,
      allergyDetails: past.allergies?.details || "",

      otherRelevantHistory: past.otherRelevantHistory || "",

      // ✅ Physical Exam
      painEvaluation: initialData.physicalExam?.painEvaluation || {},
      systematicExam: initialData.physicalExam?.systematicExam || {},
    });
  }, [initialData]);

  const buildClinicalSymp = () => {
    const res = [];
    if (formData.clinicalSympChecked.polyuria) res.push("Polyuria");
    if (formData.clinicalSympChecked.polydipsia) res.push("Polydipsia");
    if (formData.clinicalSympChecked.polyphagia) res.push("Polyphagia");
    if (formData.additionalClinicalSymp.trim())
      res.push(
        ...formData.additionalClinicalSymp.split(",").map((i) => i.trim())
      );
    return res;
  };

  const buildDangerSigns = () => {
    const res = [];
    if (formData.dangerSignsChecked.hydra) res.push("Dehydration");
    if (formData.dangerSignsChecked.abspain) res.push("Abdominal Pain");
    if (formData.dangerSignsChecked.hypo) res.push("Hypoglycemia");
    if (formData.dangerSignsChecked.sighing) res.push("Shortness of Breath");
    if (formData.dangerSignsChecked.confusion) res.push("Confusion");
    if (formData.additionalDangerSigns.trim())
      res.push(
        ...formData.additionalDangerSigns.split(",").map((i) => i.trim())
      );
    return res;
  };

  const buildComplications = () => {
    const res = [];
    if (formData.complicationsChecked.retino) res.push("Retinopathy");
    if (formData.complicationsChecked.nephro) res.push("Nephropathy");
    if (formData.complicationsChecked.neuro) res.push("Neuropathy");
    if (formData.complicationsChecked.footulcer) res.push("Foot Ulcer");
    if (formData.additionalComplications.trim())
      res.push(
        ...formData.additionalComplications.split(",").map((i) => i.trim())
      );
    return res;
  };

  const buildComorbidities = () => {
    const res = [];
    if (formData.comorbiditiesChecked.hiv) res.push("HIV");
    if (formData.comorbiditiesChecked.htn) res.push("Hypertension");
    if (formData.comorbiditiesChecked.liver) res.push("Liver Disease");
    if (formData.comorbiditiesChecked.prego) res.push("Pregnant");
    if (formData.additionalComorbidities.trim()) {
      res.push(
        ...formData.additionalComorbidities.split(",").map((i) => i.trim())
      );
    }
    return res;
  };

  const buildPastHistory = () => ({
    patientMedicalHistory: [
      ...(formData.tonsilitis ? ["Tonsilitis"] : []),
      ...(formData.previousHospitalAdmission
        ? ["Previous Hospital Admission"]
        : []),
      ...(formData.smoker ? ["Former/Current Smoker"] : []),
      ...(formData.alcohol ? ["Former/Current Alcohol Heavy Consumption"] : []),
      ...(formData.undernutrition ? ["History of Undernutrition"] : []),
    ],
    surgicalHistory: formData.surgicalHistory || "",
    obstetricalHistory: formData.obstetricalHistory || "",
    familyHistory: {
      summary: formData.familyHistory
        ? "Family History of chronic diseases"
        : "",
      ubudeheClass: formData.ubudeheClass || "",
    },
    medications: {
      checklist: [
        ...(formData.medCVD ? ["Medication: CVD"] : []),
        ...(formData.medDM ? ["Medication: DM"] : []),
        ...(formData.medCRD ? ["Medication: CRD"] : []),
        ...(formData.medTB ? ["Medication: TB Drugs"] : []),
        ...(formData.medHIV ? ["Medication: HIV"] : []),
        ...(formData.medContraceptives ? ["Medication: Contraceptives"] : []),
      ],
      others: formData.medOthers || "",
    },
    allergies: {
      hasAllergy: formData.allergyYes,
      details: formData.allergyYes ? formData.allergyDetails : "",
    },
    otherRelevantHistory: formData.otherRelevantHistory || "",
  });

  const buildPhysicalExam = () => {
    return {
      painEvaluation: formData.painEvaluation || {},
      systematicExam: formData.systematicExam || {},
    };
  };

  const handleSave = async () => {
    if (!validatePainScores(formData.painEvaluation)) {
      toast({
        title: "Invalid pain score",
        description: "Each score must be between 0 and 10.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        phone_number: patient?.phone_number,
        consultationID: formData.consultationID, // used to locate which consult
        updatedData: {
          consultDate: formData.consultDate, // 👈 for saving inside
          clinicalSymp: buildClinicalSymp(),
          dangerSigns: buildDangerSigns(),
          complications: buildComplications(),
          comorbidities: buildComorbidities(),
          doctor_comment: formData.doctor_comment,
          pastHistorySummary: buildPastHistory(),
          physicalExam: buildPhysicalExam(),
        },
      };

      const res = await fetch(`${apiHost}/editDiabConsultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === "ok") {
        toast({
          title: "Consultation updated successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        if (onSaved) {
          onSaved(); // Callback to parent to refetch
        }
        onClose();
      } else {
        throw new Error(data.error || "Failed to update consultation");
      }
    } catch (error) {
      console.error("Error updating consultation:", error);
      toast({
        title: "Error updating consultation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const goNext = () => {
    if (tabIndex < 2) setTabIndex(tabIndex + 1);
  };

  const goPrev = () => {
    if (tabIndex > 0) setTabIndex(tabIndex - 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Consultation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
            orientation="vertical"
            variant="unstyled"
          >
            <Flex>
              <TabList w="250px" borderRightWidth="1px">
                <Tab _selected={{ bg: "purple.100" }}>Current History</Tab>
                <Tab _selected={{ bg: "purple.100" }}>Past History</Tab>
                <Tab _selected={{ bg: "purple.100" }}>Physical Exam</Tab>
              </TabList>
              <TabPanels flex="1">
                <TabPanel>
                  <CurrentHistory
                    formData={formData}
                    setFormData={setFormData}
                  />
                </TabPanel>
                <TabPanel>
                  <PastHistory formData={formData} setFormData={setFormData} />
                </TabPanel>
                <TabPanel>
                  <PhysicalExam formData={formData} setFormData={setFormData} />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          {tabIndex > 0 && (
            <Button
              variant="outline"
              colorScheme="purple"
              mr={3}
              onClick={goPrev}
            >
              Previous
            </Button>
          )}
          {tabIndex < 2 ? (
            <Button variant="solid" colorScheme="purple" onClick={goNext}>
              Next
            </Button>
          ) : (
            <SaveButton
              onClick={handleSave}
              isSaving={isSaving}
              text="Save Changes"
              colorScheme="purple"
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
