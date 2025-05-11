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
  useToast,
} from "@chakra-ui/react";
import SaveButton from "../../../../../../common/buttons/saveButton";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

import CurrentHistory from "./addConsult/currentHistory";
import PastHistory from "./addConsult/pastHistory";
import PhysicalExam from "./addConsult/physicalExam";
import { validatePainScores } from "./addConsult/physicalExam";

function AddConsult({ isOpen, onClose }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const patient = DiabPatientData();
  const toast = useToast();

  //API
  const [apiHost, setApiHost] = useState("");

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const [formData, setFormData] = useState({
    clinicalSympChecked: {
      polyuria: false,
      polydipsia: false,
      polyphagia: false,
    },
    additionalClinicalSymp: "",
    dangerSignsChecked: {
      hydra: false,
      abspain: false,
      hypo: false,
      sighing: false,
      confusion: false,
    },
    additionalDangerSigns: "",
    complicationsChecked: {
      retino: false,
      nephro: false,
      neuro: false,
      footulcer: false,
    },
    additionalComplications: "",
    comorbiditiesChecked: {
      hiv: false,
      htn: false,
      liver: false,
      prego: false,
    },
    additionalComorbidities: "",
    doctor_comment: "",
    painEvaluation: {
      physical: "",
      psychological: "",
      spiritual: "",
      comment: "",
    },
    systematicExam: {},
  });

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

  const buildPastHistorySummary = () => {
    return {
      patientMedicalHistory: [
        formData.tonsilitis && "History of Tonsilitis",
        formData.previousHospitalAdmission && "Previous Hospital Admission",
        formData.smoker && "Smoker",
        formData.alcohol && "Alcohol Consumption",
        formData.undernutrition && "History of Undernutrition",
      ].filter(Boolean), // Remove any false/undefined entries

      surgicalHistory: formData.surgicalHistory || "",
      obstetricalHistory: formData.obstetricalHistory || "",

      familyHistory: {
        summary: formData.familyHistory ? "Chronic disease in family" : "",
        ubudeheClass: formData.ubudeheClass || "",
      },

      medications: {
        checklist: [
          formData.medCVD && "CVD",
          formData.medDM && "DM",
          formData.medCRD && "CRD",
          formData.medTB && "TB Drugs",
          formData.medHIV && "HIV",
          formData.medContraceptives && "Contraceptives",
        ].filter(Boolean),
        others: formData.medOthers || "",
      },

      allergies: {
        hasAllergy: formData.allergyYes,
        details: formData.allergyYes ? formData.allergyDetails || "" : "",
      },

      otherRelevantHistory: formData.otherRelevantHistory || "",
    };
  };

  const buildPhysicalExam = () => ({
    painEvaluation: formData.painEvaluation || {},
    systematicExam: formData.systematicExam || {},
  });

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
      const latestConsultationID =
        patient?.vitals?.[patient.vitals.length - 1]?.consultationID;

      if (!latestConsultationID) {
        toast({
          title: "No vitals found",
          description: "Cannot save consultation without vitals.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsSaving(false);
        return;
      }

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        "0"
      )}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${today.getFullYear()}`;

      const payload = {
        phone_number: patient?.phone_number,
        consultationID: latestConsultationID,
        consultDate: formattedDate,
        clinicalSymp: buildClinicalSymp(),
        dangerSigns: buildDangerSigns(),
        complications: buildComplications(),
        comorbidities: buildComorbidities(),
        doctor_comment: formData.doctor_comment,
        pastHistorySummary: buildPastHistorySummary(),
        physicalExam: buildPhysicalExam(),
      };

      const response = await fetch(`${apiHost}/registerDiabConsultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.status === "ok") {
        toast({
          title: "Consultation saved",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          setIsSaving(false);
          onClose();
        }, 1500);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error saving consultation:", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Diabetes Consultation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            index={tabIndex}
            onChange={(i) => setTabIndex(i)}
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
              onClick={() => setTabIndex(tabIndex - 1)}
            >
              Previous
            </Button>
          )}
          {tabIndex < 2 ? (
            <Button
              variant="solid"
              colorScheme="purple"
              onClick={() => setTabIndex(tabIndex + 1)}
            >
              Next
            </Button>
          ) : (
            <SaveButton
              onClick={handleSave}
              isSaving={isSaving}
              text="Save Consultation"
              colorScheme="purple"
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddConsult;
