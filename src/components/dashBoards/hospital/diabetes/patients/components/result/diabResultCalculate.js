import React, { useEffect, useState } from "react";
import { Button, Alert, AlertIcon, Center } from "@chakra-ui/react";

// -------------- UTILITY FUNCTIONS -------------- //

function parseDosageValue(dosageTriple) {
  if (!dosageTriple || dosageTriple.length < 3) return NaN;
  const doseStr = dosageTriple[1]; // e.g., "500mg"
  const match = doseStr.match(/([\d.]+)/);
  if (!match) return NaN;
  return parseFloat(match[1]);
}

function adjustDosage(dosageTriple, percentage) {
  const currentValue = parseDosageValue(dosageTriple);
  if (isNaN(currentValue)) return dosageTriple;
  const newValue = currentValue * (1 + percentage / 100);
  const newValueStr = newValue.toFixed(2) + " units/kg"; // keep two decimal places
  return [dosageTriple[0], newValueStr, dosageTriple[2]];
}

function makeInsulinDosage(value) {
  let doseNum = 0.1;
  if (value > 300) doseNum = 0.2;
  else if (value > 250) doseNum = 0.15;
  else if (value > 180) doseNum = 0.1;
  else if (value > 120) doseNum = 0.05;
  const doseStr = doseNum.toFixed(2) + " units/kg";
  return ["INSULIN THERAPY", doseStr, "once daily"];
}

function makeOralDosage(bmiValue) {
  if (bmiValue > 25) {
    return ["METFORMIN", "500mg", "twice a day"];
  } else {
    return ["GLIBENCLAMIDE", "5mg", "once a day"];
  }
}

// -------------- ERROR POPUP COMPONENT -------------- //

const ErrorPopup = ({ message, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        maxWidth: "90%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <p>{message}</p>
      <button onClick={onClose} style={{ marginTop: "10px" }}>
        Ok
      </button>
    </div>
  </div>
);

// -------------- MAIN COMPONENT -------------- //

const DiabResultCalculate = ({ patient }) => {
  // State variables
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [apiHost, setApiHost] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  // Use patient.consultations (from the DB) for consultation count.
  const [processedCount, setProcessedCount] = useState(
    patient.consultations || 0
  );

  const dismissError = () => setError(null);

  // Update processedCount when patient data changes.
  useEffect(() => {
    setProcessedCount(patient.consultations || 0);
  }, [patient]);

  // Load API host from apiHost.txt
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const processResults = async () => {
    setAlertMsg("");

    if (
      !patient ||
      !patient.vitalsDates ||
      !patient.labDates ||
      !patient.doctorDates ||
      !patient.phone_number
    ) {
      setError("Patient record incomplete or not provided.");
      return;
    }

    // Determine how many complete consultations are available.
    const fullCircleCount = Math.min(
      patient.vitalsDates.length,
      patient.labDates.length,
      patient.doctorDates.length
    );

    if (fullCircleCount === 0) {
      setAlertMsg("No consultations available to process.");
      return;
    }

    if (!apiHost) {
      console.log("API host not loaded yet.");
      return;
    }

    setProcessing(true);

    // Capture previous processed count and read existing count from DB field
    const oldProcessedCount = processedCount;
    const existingCount = patient.consultations || 0; // number of consultations stored in the DB

    let newConsultations = 0;
    let updatedConsultations = 0;

    // Loop over all available consultations
    for (let i = 0; i < fullCircleCount; i++) {
      const fastValue = parseFloat(patient.fastglucose[i]);
      const gluValue = parseFloat(patient.glucose[i]);
      const hbValue = parseFloat(patient.hb[i]);
      if (isNaN(fastValue) || isNaN(gluValue) || isNaN(hbValue)) {
        console.error(`Invalid lab data at index ${i}. Skipping consultation.`);
        continue;
      }

      const flattenedDangerSigns = patient.dangerSigns
        ? patient.dangerSigns.flat()
        : [];
      const flattenedComorbidities = patient.comorbidities
        ? patient.comorbidities.flat()
        : [];
      const flattenedComplications = patient.complications
        ? patient.complications.flat()
        : [];

      const severeDanger = flattenedDangerSigns.some(
        (sign) =>
          typeof sign === "string" &&
          (sign.toLowerCase() === "dehydration" ||
            sign.toLowerCase() === "abdominal pain" ||
            sign.toLowerCase() === "hypoglycemia" ||
            sign.toLowerCase() === "shortness of breath" ||
            sign.toLowerCase() === "confusion")
      );

      let diagnosis = "";
      let patient_manage = "";
      let medication = "";
      let resultComment = "";
      let dosageTriple = ["", "", ""];
      let control = "N/A";

      // Decision tree for the first consultation
      if (i === 0) {
        const immediateTransfer =
          gluValue > 400 ||
          flattenedComorbidities.some(
            (c) =>
              typeof c === "string" && c.toLowerCase().includes("pregnancy")
          ) ||
          flattenedComplications.some(
            (c) =>
              typeof c === "string" &&
              (c.toLowerCase().includes("renal") ||
                c.toLowerCase().includes("foot ulcer"))
          ) ||
          patient.age < 18;

        if (immediateTransfer) {
          diagnosis = "Diabetes";
          patient_manage =
            "Transfer patients to the hospital to initiate insulin";
          medication = "Insulin Therapy";
          resultComment =
            "Immediate transfer: criteria met (>400 mg/dL, pregnancy, renal/foot ulcer, or age <18).";
          dosageTriple = makeInsulinDosage(fastValue);
        } else {
          if (fastValue >= 126 || gluValue >= 126 || hbValue >= 6.5) {
            if (fastValue >= 200 || gluValue >= 200 || hbValue >= 7.5) {
              if (
                fastValue > 400 ||
                gluValue > 400 ||
                hbValue > 8 ||
                severeDanger
              ) {
                diagnosis = "Diabetes";
                patient_manage =
                  "Transfer patients to the hospital to initiate insulin";
                medication = "Insulin Therapy";
                resultComment = "Severe condition: immediate action required.";
                dosageTriple = makeInsulinDosage(fastValue);
              } else {
                diagnosis = "Diabetes";
                patient_manage = "Manage as an Outpatient (OPD)";
                medication = "Oral Therapy";
                resultComment = "Diabetes confirmed with high lab values.";
                const currentBMI =
                  patient.bmi && patient.bmi[i]
                    ? parseFloat(patient.bmi[i])
                    : 0;
                dosageTriple = makeOralDosage(currentBMI);
              }
            } else {
              diagnosis = "Second Consultation is Needed to Confirm";
              patient_manage = "Follow Up Visit in 2-4 Weeks";
              medication = "None";
              resultComment =
                "Second consultation needed to confirm diagnosis.";
            }
          } else {
            diagnosis = "No Diabetes";
            patient_manage = "No Further Comment";
            medication = "None";
            resultComment = "Stop Diabetes Workup If Present.";
          }
        }
      }
      // Decision tree for subsequent consultations
      else {
        const prevMed =
          patient.medication && patient.medication[i - 1]
            ? patient.medication[i - 1]
            : "";
        if (
          patient.diagnosis &&
          patient.diagnosis[i - 1] ===
            "Second Consultation is Needed to Confirm"
        ) {
          const prevFastValue = parseFloat(patient.fastglucose[i - 1]);
          const prevHbValue = parseFloat(patient.hb[i - 1]);
          if (
            (prevFastValue > 126 && fastValue > 126) ||
            (prevHbValue > 6.5 && hbValue > 6.5)
          ) {
            diagnosis = "Diabetes";
            patient_manage = "Manage as an Outpatient (OPD)";
            medication = "Oral Therapy";
            resultComment = "Confirmed on follow-up: repeated abnormal labs.";
            const currentBMI =
              patient.bmi && patient.bmi[i] ? parseFloat(patient.bmi[i]) : 0;
            dosageTriple = makeOralDosage(currentBMI);
          } else {
            const immediateTransfer =
              gluValue > 400 ||
              flattenedComorbidities.some(
                (c) =>
                  typeof c === "string" && c.toLowerCase().includes("pregnancy")
              ) ||
              flattenedComplications.some(
                (c) =>
                  typeof c === "string" &&
                  (c.toLowerCase().includes("renal") ||
                    c.toLowerCase().includes("foot ulcer"))
              ) ||
              patient.age < 18;
            if (immediateTransfer) {
              diagnosis = "Diabetes";
              patient_manage =
                "Transfer patients to the hospital to initiate insulin";
              medication = "Insulin Therapy";
              resultComment =
                "Immediate transfer on reconsultation: criteria met.";
              dosageTriple = makeInsulinDosage(fastValue);
            } else {
              if (fastValue >= 126 || gluValue >= 126 || hbValue >= 6.5) {
                if (fastValue >= 200 || gluValue >= 200 || hbValue >= 7.5) {
                  if (
                    fastValue > 400 ||
                    gluValue > 400 ||
                    hbValue > 8 ||
                    severeDanger
                  ) {
                    diagnosis = "Diabetes";
                    patient_manage =
                      "Transfer patients to the hospital to initiate insulin";
                    medication = "Insulin Therapy";
                    resultComment = "Severe condition on reconsultation.";
                    dosageTriple = makeInsulinDosage(fastValue);
                  } else {
                    diagnosis = "Diabetes";
                    patient_manage = "Manage as an Outpatient (OPD)";
                    medication = "Oral Therapy";
                    resultComment = "Diabetes confirmed on reconsultation.";
                    const currentBMI =
                      patient.bmi && patient.bmi[i]
                        ? parseFloat(patient.bmi[i])
                        : 0;
                    dosageTriple = makeOralDosage(currentBMI);
                  }
                } else {
                  diagnosis = "No Diabetes";
                  patient_manage = "No Further Comment";
                  medication = "None";
                  resultComment = "Stop Diabetes Workup If Present.";
                }
              } else {
                diagnosis = "No Diabetes";
                patient_manage = "No Further Comment";
                medication = "None";
                resultComment = "Stop Diabetes Workup If Present.";
              }
            }
          }
        } else if (fastValue <= 50) {
          diagnosis = "Hypoglycemia";
          patient_manage = "Patient is Hypoglycemia";
          medication = "N/A";
          resultComment = "Immediate attention required for hypoglycemia.";
          if (prevMed && prevMed.toLowerCase().includes("insulin")) {
            const prevDosage =
              patient.dosage && patient.dosage[i - 1]
                ? patient.dosage[i - 1]
                : ["", "", ""];
            // Use the baseline dosage rather than compounding adjustments
            dosageTriple = adjustDosage(prevDosage, -15);
            resultComment += " Instruct patient to carry sugary drink";
          } else {
            dosageTriple = ["", "", ""];
          }
        } else {
          diagnosis = "Diabetes";
          patient_manage = "Medication/Insulin Titrations Required";
          medication = "";
          resultComment = "Adjust medication as needed.";
          if (prevMed && prevMed.toLowerCase().includes("insulin")) {
            const prevDosage =
              patient.dosage && patient.dosage[i - 1]
                ? patient.dosage[i - 1]
                : ["", "", ""];
            // Again, adjust based on the stored baseline if available.
            dosageTriple = adjustDosage(prevDosage, 15);
            medication = "Insulin Therapy";
          } else {
            medication = "Oral Therapy";
            const currentBMI =
              patient.bmi && patient.bmi[i] ? parseFloat(patient.bmi[i]) : 0;
            dosageTriple = makeOralDosage(currentBMI);
          }
        }
      }

      // ----- Insert new control logic for consultations beyond the first -----
      if (i > 0) {
        if (gluValue > 400) {
          control = "Emergency Control";
          medication = "Requires emergency attention!";
        } else if (
          (fastValue >= 150 && fastValue <= 180) ||
          (hbValue >= 7.5 && hbValue <= 8.0)
        ) {
          control = "Good Control";
          if (medication.toLowerCase().includes("insulin")) {
            patient_manage = "Maintain insulin dose";
            resultComment +=
              " Monitor blood glucose with twice daily urine dipsticks";
          } else {
            patient_manage = "No medication/insulin changes required";
            medication = "";
          }
        } else if (fastValue > 185 || hbValue > 8.0) {
          control = "Poor Control";
          if (medication.toLowerCase().includes("insulin")) {
            const prevDosage =
              patient.dosage && patient.dosage.length > 0
                ? patient.dosage[patient.dosage.length - 1]
                : ["", "", ""];
            dosageTriple = adjustDosage(prevDosage, 15);
            resultComment +=
              " Monitor with twice daily fingersticks for 2 weeks, Patients should follow-up";
            patient_manage +=
              " Monitor with twice daily fingersticks for 2 weeks, Patients should follow-up";
          } else {
            patient_manage = "Medication/Insulin titrations required";
            medication = "Medication/Insulin titrations required";
          }
        }
      }

      // If this consultation has already been processed, use the stored dosage
      // so that we don't reapply adjustments.
      if (i < existingCount && patient.dosage && patient.dosage[i]) {
        dosageTriple = patient.dosage[i];
      }

      // For existing consultations (based on DB field patient.consultations), update via edit API.
      if (i < existingCount) {
        updatedConsultations++;
        const payload = {
          phone_number: patient.phone_number,
          recordIndex: i,
          diagnosis, // include recalculated diagnosis
          patient_manage,
          medication,
          dosage: dosageTriple,
          control, // include recalculated control
          resultComment,
        };
        try {
          await fetch(apiHost + "/editDiabResultBack", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.error(`Error updating result for consultation ${i}:`, err);
        }
      } else {
        newConsultations++;
        const payload = {
          phone_number: patient.phone_number,
          diagnosis,
          patient_manage,
          medication,
          control,
          dosage: dosageTriple,
          resultComment,
        };
        try {
          await fetch(apiHost + "/registerDiabResultBack", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.error(`Error registering result for consultation ${i}:`, err);
        }
      }
    }

    // If previously processed count is greater than current complete consultations,
    // delete the extra results (loop in reverse).
    if (oldProcessedCount > fullCircleCount) {
      for (let i = oldProcessedCount - 1; i >= fullCircleCount; i--) {
        try {
          await fetch(apiHost + "/deleteDiabResultBack", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              phone_number: patient.phone_number,
              recordIndex: i,
            }),
          });
        } catch (err) {
          console.error(`Error deleting result for consultation ${i}:`, err);
        }
      }
    }

    // Update processedCount to reflect current complete consultations.
    setProcessedCount(fullCircleCount);
    setProcessing(false);

    let message = "";
    if (newConsultations === 0 && updatedConsultations > 0) {
      message = "No new consultations to process. Results have been updated.";
    } else if (newConsultations > 0 && updatedConsultations > 0) {
      message =
        "New consultations processed. Existing results have been updated.";
    } else if (newConsultations > 0) {
      message = "New consultations processed.";
    } else {
      message = "No consultations to process.";
    }
    if (oldProcessedCount > fullCircleCount) {
      message += " Extra results have been deleted.";
    }
    setAlertMsg(message);

    // Optionally reload the page after a short delay.
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    <div style={{ padding: "20px" }}>
      {alertMsg && (
        <Center my={4}>
          <Alert status="warning">
            <AlertIcon />
            {alertMsg}
          </Alert>
        </Center>
      )}
      {!processing && !error && <p>Results have been saved</p>}
      {error && <ErrorPopup message={error} onClose={dismissError} />}
      <Button
        mt="4"
        colorScheme="yellow"
        onClick={processResults}
        isLoading={processing}
        loadingText="Processing Results"
        disabled={!apiHost}
        textColor="white"
      >
        Load Results
      </Button>
    </div>
  );
};

export default DiabResultCalculate;
