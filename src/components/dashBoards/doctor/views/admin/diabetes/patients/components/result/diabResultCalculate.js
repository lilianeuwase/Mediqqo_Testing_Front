// DiabResultCalculate.js
import React, { useEffect, useState } from "react";
import { Button, Alert, AlertIcon, Center } from "@chakra-ui/react";

// -------------- UTILITY FUNCTIONS -------------- //

/**
 * Extracts the numeric portion from a dosage triple.
 * Example: ["METFORMIN", "500mg", "twice a day"] returns 500.
 */
function parseDosageValue(dosageTriple) {
  if (!dosageTriple || dosageTriple.length < 3) return NaN;
  const doseStr = dosageTriple[1]; // e.g., "500mg"
  const match = doseStr.match(/([\d.]+)/);
  if (!match) return NaN;
  return parseFloat(match[1]);
}

/**
 * Adjusts the numeric portion of the dosage triple by a given percentage.
 * For example, ["METFORMIN", "500mg", "twice a day"] with 15 returns ["METFORMIN", "575mg", "twice a day"].
 */
function adjustDosage(dosageTriple, percentage) {
  const currentValue = parseDosageValue(dosageTriple);
  if (isNaN(currentValue)) return dosageTriple;
  const newValue = currentValue * (1 + percentage / 100);
  const newValueStr = newValue.toFixed(0) + "mg"; // keep unit "mg"
  return [dosageTriple[0], newValueStr, dosageTriple[2]];
}

/**
 * Returns a default insulin dosage triple based on the fast blood glucose value.
 */
function makeInsulinDosage(value) {
  let doseNum = 0.1;
  if (value > 300) doseNum = 0.2;
  else if (value > 250) doseNum = 0.15;
  else if (value > 180) doseNum = 0.1;
  else if (value > 120) doseNum = 0.05;
  const doseStr = doseNum.toFixed(2) + " units/kg";
  return ["INSULIN THERAPY", doseStr, "once daily"];
}

/**
 * Returns a default oral dosage triple based on BMI.
 * Example: if BMI > 25, return ["METFORMIN", "500mg", "twice a day"];
 * otherwise, return ["GLIBENCLAMIDE", "5mg", "once a day"].
 */
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
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [apiHost, setApiHost] = useState("");
  // New state for displaying alert messages.
  const [alertMsg, setAlertMsg] = useState("");

  // Track the number of processed consultations locally.
  const [processedCount, setProcessedCount] = useState(
    patient.diagnosis ? patient.diagnosis.length : 0
  );

  const dismissError = () => setError(null);

  // Update processedCount if the patient prop changes.
  useEffect(() => {
    setProcessedCount(patient.diagnosis ? patient.diagnosis.length : 0);
  }, [patient]);

  // Load the API host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // Manual trigger function for processing results
  const processResults = async () => {
    // Clear any previous alert message.
    setAlertMsg("");
    
    // Validate required patient data.
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

    const fullCircleCount = Math.min(
      patient.vitalsDates.length,
      patient.labDates.length,
      patient.doctorDates.length
    );

    // Only process new consultations if there are more dates than results already processed.
    if (fullCircleCount <= processedCount) {
      setAlertMsg("No new consultations to process.");
      return;
    }
    if (!apiHost) {
      console.log("API host not loaded yet.");
      return;
    }

    setProcessing(true);

    // Process consultations starting from the processedCount index.
    for (let i = processedCount; i < fullCircleCount; i++) {
      const fastValue = parseFloat(patient.fastglucose[i]);
      const gluValue = parseFloat(patient.glucose[i]);
      const hbValue = parseFloat(patient.hb[i]);
      if (isNaN(fastValue) || isNaN(gluValue) || isNaN(hbValue)) {
        console.error(`Invalid lab data at index ${i}. Skipping consultation.`);
        continue;
      }

      // Flatten nested arrays from the patient record fields.
      const flattenedDangerSigns = patient.dangerSigns ? patient.dangerSigns.flat() : [];
      const flattenedComorbidities = patient.comorbidities ? patient.comorbidities.flat() : [];
      const flattenedComplications = patient.complications ? patient.complications.flat() : [];

      const severeDanger = flattenedDangerSigns.some((sign) =>
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
      let comment = "";
      let dosageTriple = ["", "", ""]; // Triple: [medication name, dose, schedule]

      // ------------------------------
      // 1) INITIAL CONSULTATION (i === 0)
      // ------------------------------
      if (i === 0) {
        const immediateTransfer =
          gluValue > 400 ||
          flattenedComorbidities.some(
            (c) => typeof c === "string" && c.toLowerCase().includes("pregnancy")
          ) ||
          flattenedComplications.some(
            (c) =>
              typeof c === "string" &&
              (c.toLowerCase().includes("renal") || c.toLowerCase().includes("foot ulcer"))
          ) ||
          patient.age < 18;

        if (immediateTransfer) {
          diagnosis = "Diabetes";
          patient_manage = "Transfer patients to the hospital to initiate insulin";
          medication = "Insulin Therapy";
          comment =
            "Immediate transfer: criteria met (>400 mg/dL, pregnancy, renal/foot ulcer, or age <18).";
          dosageTriple = makeInsulinDosage(fastValue);
        } else {
          if (fastValue >= 126 || gluValue >= 126 || hbValue >= 6.5) {
            if (fastValue >= 200 || gluValue >= 200 || hbValue >= 7.5) {
              if (fastValue > 400 || gluValue > 400 || hbValue > 8 || severeDanger) {
                diagnosis = "Diabetes";
                patient_manage = "Transfer patients to the hospital to initiate insulin";
                medication = "Insulin Therapy";
                comment = "Severe condition: immediate action required.";
                dosageTriple = makeInsulinDosage(fastValue);
              } else {
                diagnosis = "Diabetes";
                patient_manage = "Manage as an Outpatient (OPD)";
                medication = "Oral Therapy";
                comment = "Diabetes confirmed with high lab values.";
                const currentBMI =
                  patient.bmi && patient.bmi[i] ? parseFloat(patient.bmi[i]) : 0;
                dosageTriple = makeOralDosage(currentBMI);
              }
            } else {
              diagnosis = "Second Consultation is Needed to Confirm";
              patient_manage = "Follow Up Visit in 2-4 Weeks";
              medication = "None";
              comment = "Second consultation needed to confirm diagnosis.";
            }
          } else {
            diagnosis = "No Diabetes";
            patient_manage = "No Further Comment";
            medication = "None";
            comment = "Stop Diabetes Workup If Present.";
          }
        }
      }
      // ------------------------------
      // 2) RECONSULTATIONS (i > 0)
      // ------------------------------
      else {
        const prevMed =
          patient.medication && patient.medication[i - 1]
            ? patient.medication[i - 1]
            : "";
        if (
          patient.diagnosis &&
          patient.diagnosis[i - 1] === "Second Consultation is Needed to Confirm"
        ) {
          const prevFastValue = parseFloat(patient.fastglucose[i - 1]);
          const prevHbValue = parseFloat(patient.hb[i - 1]);
          if ((prevFastValue > 126 && fastValue > 126) || (prevHbValue > 6.5 && hbValue > 6.5)) {
            diagnosis = "Diabetes";
            patient_manage = "Manage as an Outpatient (OPD)";
            medication = "Oral Therapy";
            comment = "Confirmed on follow-up: repeated abnormal labs.";
            const currentBMI =
              patient.bmi && patient.bmi[i] ? parseFloat(patient.bmi[i]) : 0;
            dosageTriple = makeOralDosage(currentBMI);
          } else {
            const immediateTransfer =
              gluValue > 400 ||
              flattenedComorbidities.some(
                (c) => typeof c === "string" && c.toLowerCase().includes("pregnancy")
              ) ||
              flattenedComplications.some(
                (c) =>
                  typeof c === "string" &&
                  (c.toLowerCase().includes("renal") || c.toLowerCase().includes("foot ulcer"))
              ) ||
              patient.age < 18;
            if (immediateTransfer) {
              diagnosis = "Diabetes";
              patient_manage = "Transfer patients to the hospital to initiate insulin";
              medication = "Insulin Therapy";
              comment = "Immediate transfer on reconsultation: criteria met.";
              dosageTriple = makeInsulinDosage(fastValue);
            } else {
              if (fastValue >= 126 || gluValue >= 126 || hbValue >= 6.5) {
                if (fastValue >= 200 || gluValue >= 200 || hbValue >= 7.5) {
                  if (fastValue > 400 || gluValue > 400 || hbValue > 8 || severeDanger) {
                    diagnosis = "Diabetes";
                    patient_manage = "Transfer patients to the hospital to initiate insulin";
                    medication = "Insulin Therapy";
                    comment = "Severe condition on reconsultation.";
                    dosageTriple = makeInsulinDosage(fastValue);
                  } else {
                    diagnosis = "Diabetes";
                    patient_manage = "Manage as an Outpatient (OPD)";
                    medication = "Oral Therapy";
                    comment = "Diabetes confirmed on reconsultation.";
                    const currentBMI =
                      patient.bmi && patient.bmi[i] ? parseFloat(patient.bmi[i]) : 0;
                    dosageTriple = makeOralDosage(currentBMI);
                  }
                } else {
                  diagnosis = "No Diabetes";
                  patient_manage = "No Further Comment";
                  medication = "None";
                  comment = "Stop Diabetes Workup If Present.";
                }
              } else {
                diagnosis = "No Diabetes";
                patient_manage = "No Further Comment";
                medication = "None";
                comment = "Stop Diabetes Workup If Present.";
              }
            }
          }
        }
        // Hypoglycemia branch.
        else if (fastValue <= 50) {
          diagnosis = "Hypoglycemia";
          patient_manage = "Patient is Hypoglycemia";
          medication = "N/A";
          comment = "Immediate attention required for hypoglycemia.";
          if (prevMed && prevMed.toLowerCase().includes("insulin")) {
            const prevDosage =
              patient.dosage && patient.dosage.length > 0
                ? patient.dosage[patient.dosage.length - 1]
                : ["", "", ""];
            dosageTriple = adjustDosage(prevDosage, -15);
            comment += " Instruct patient to carry sugary drink";
          } else {
            dosageTriple = ["", "", ""];
          }
        } else {
          diagnosis = "Diabetes";
          patient_manage = "Medication/Insulin Titrations Required";
          medication = "";
          comment = "Adjust medication as needed.";
          if (prevMed && prevMed.toLowerCase().includes("insulin")) {
            const prevDosage =
              patient.dosage && patient.dosage.length > 0
                ? patient.dosage[patient.dosage.length - 1]
                : ["", "", ""];
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

      // ------------------------------
      // CONTROL LOGIC (Only for follow-up visits, i > 0)
      // ------------------------------
      let control = "N/A";
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
            comment += " Monitor blood glucose with twice daily urine dipsticks";
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
            comment +=
              " Monitor with twice daily fingersticks for 2 weeks, Patients should follow-up";
            patient_manage +=
              " Monitor with twice daily fingersticks for 2 weeks, Patients should follow-up";
          } else {
            patient_manage = "Medication/Insulin titrations required";
            medication = "Medication/Insulin titrations required";
          }
        }
      }

      // ------------------------------
      // SEND RESULTS TO BACKEND
      // ------------------------------
      try {
        const response = await fetch(`${apiHost}/registerDiabResult`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            phone_number: patient.phone_number,
            diagnosis,
            patient_manage,
            medication,
            consultations: i + 1,
            control,
            dosage: dosageTriple,
            resultComment: comment,
          }),
        });
        const data = await response.json();
        if (!data.status || data.status !== "ok") {
          console.error(`Error updating result for consultation ${i}: ${data.error}`);
        }
      } catch (err) {
        console.error(`Error updating result for consultation ${i}:`, err);
      }
    }
    // Update processedCount so that only new data is processed next time.
    setProcessedCount(fullCircleCount);
    setProcessing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Show an informational alert if there are no new consultations */}
      {alertMsg && (
        <Center my={4}>
          <Alert status="warning">
            <AlertIcon />
            {alertMsg}
          </Alert>
        </Center>
      )}
      {!processing && !error && <p>Results have been sent to the database.</p>}
      {error && <ErrorPopup message={error} onClose={dismissError} />}
      <Button
        mt="4"
        colorScheme="red"
        onClick={processResults}
        isLoading={processing}
        loadingText="Processing Results"
        disabled={!apiHost}
      >
        Load Results
      </Button>
    </div>
  );
};

export default DiabResultCalculate;
