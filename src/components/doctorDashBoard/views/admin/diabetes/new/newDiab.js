import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import PatientProfile from "./patientProfile";
import LabAndVitals from "./labAndVitals";
import AdditionalInfo from "./additionalInfo";
import { UserData } from "../../../../../../DBConnection/UserData";

function NewDiab() {
  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // ============================
  // Page 1 State
  // ============================
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [id, setID] = useState("");
  const [phone_number, setPhone] = useState("");
  const [full_address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");

  // ============================
  // Page 2 State
  // ============================
  const [glucose, setGlucose] = useState("");
  const [hb, setHb] = useState("");
  const [fastglucose, setFastGlucose] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [HR, setHR] = useState("");
  const [O2, setO2] = useState("");

  // ============================
  // Page 3 State
  // ============================
  const [doctor_comment, setDoctorComment] = useState("");
  const [state, setState] = useState({
    polyuria: false,
    polydipsia: false,
    polyphagia: false,
    hydra: false,
    abspain: false,
    hypo: false,
    sighing: false,
    confusion: false,
    retino: false,
    nephro: false,
    neuro: false,
    footulcer: false,
    hiv: false,
    htn: false,
    liver: false,
    prego: false,
  });

  const handleCheckboxChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  // ============================
  // DB Connection and Helper Functions
  // ============================
  const dfname = UserData().fname;
  const dlname = UserData().lname;
  const dname = "Dr. " + dfname + " " + dlname;
  const consultations = 1;
  const dates = new Date().toLocaleString();
  const doctor_name = dname;
  const hospital = UserData().hospital;
  const status = true;

  const calculateBMI = (weight, height) => {
    if (height <= 0) return null;
    return weight / (height * height);
  };

  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const validateStep = () => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!fname.trim()) newErrors.fname = "First Name is required";
      else if (/\d/.test(fname))
        newErrors.fname = "First Name cannot contain numbers";
      if (!lname.trim()) newErrors.lname = "Last Name is required";
      else if (/\d/.test(lname))
        newErrors.lname = "Last Name cannot contain numbers";
      if (!dob) newErrors.dob = "Date of Birth is required";
      else {
        const dobDate = new Date(dob);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (dobDate > today)
          newErrors.dob = "Date of Birth cannot be in the future";
        else if (calculateAge(dob) > 120)
          newErrors.dob = "Age cannot be above 120";
      }
      if (!gender) newErrors.gender = "Gender is required";
      if (!height) newErrors.height = "Height is required";
      else if (!/^\d+(\.\d{1,2})?$/.test(height))
        newErrors.height =
          "Height must be a valid number with up to 2 decimal places";
      else if (parseFloat(height) < 0.54 || parseFloat(height) > 2.8)
        newErrors.height = "Height must be between 0.54 and 2.8 meters";
      if (!weight) newErrors.weight = "Weight is required";
      else if (!/^\d+(\.\d{1,2})?$/.test(weight))
        newErrors.weight =
          "Weight must be a valid number with up to 2 decimal places";
      else if (parseFloat(weight) <= 0)
        newErrors.weight = "Weight must be greater than 0";
      if (!id.trim()) newErrors.id = "ID is required";
      else if (!/^\d+$/.test(id)) newErrors.id = "ID must contain only numbers";
      if (!phone_number.trim())
        newErrors.phone_number = "Phone Number is required";
      else if (phone_number.trim().length < 10)
        newErrors.phone_number = "Phone Number must be at least 10 digits";
      if (!province) newErrors.province = "Province is required";
      if (!district) newErrors.district = "District is required";
      if (!sector.trim()) newErrors.sector = "Sector is required";
      if (!cell.trim()) newErrors.cell = "Cell is required";
    } else if (currentStep === 2) {
      if (glucose === "")
        newErrors.glucose = "Random Blood glucose is required";
      if (hb === "") newErrors.hb = "HbA1c is required";
      if (fastglucose === "")
        newErrors.fastglucose = "Fasting Blood glucose is required";
      if (creatinine === "") newErrors.creatinine = "Creatinine is required";
      if (temp === "") newErrors.temp = "Temperature is required";
      if (BP === "") newErrors.BP = "Blood Pressure is required";
      if (HR === "") newErrors.HR = "Heart Rate is required";
      if (O2 === "") newErrors.O2 = "Respiratory Rate is required";
    }
    // Note: No checkbox validation required since all can be unticked.
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
      let bmiValue = null;
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
        bmiValue = calculateBMI(weightNum, heightNum).toFixed(2);
      }
      const calculatedAge = dob ? calculateAge(dob) : null;
      setAddress(`${cell}, ${sector}, ${district}, ${province}, Rwanda`);

      fetch("https://mediqo-api.onrender.com/registerPatient", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          consultations,
          dates,
          doctor_name,
          hospital,
          fname,
          lname,
          age: calculatedAge,
          dob,
          gender,
          height,
          weight,
          bmi: bmiValue,
          id,
          phone_number,
          full_address,
          status,
          glucose,
          fastglucose,
          hb,
          creatinine,
          temp,
          BP,
          HR,
          O2,
          polyuria: state.polyuria,
          polydipsia: state.polydipsia,
          polyphagia: state.polyphagia,
          hydra: state.hydra,
          abspain: state.abspain,
          hypo: state.hypo,
          sighing: state.sighing,
          confusion: state.confusion,
          retino: state.retino,
          nephro: state.nephro,
          neuro: state.neuro,
          footulcer: state.footulcer,
          hiv: state.hiv,
          htn: state.htn,
          liver: state.liver,
          prego: state.prego,
          doctor_comment,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "patientRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
            window.location.href = "/userDetails/diabetes/diabresults";
          } else {
            // Check if the error message indicates that the phone number already exists
            if (data.error && data.error.toLowerCase().includes("phone")) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                phone_number: "Phone number already exists",
              }));
            }
            // Check if the error message indicates that the ID already exists
            if (data.error && data.error.toLowerCase().includes("id")) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                id: "ID already exists",
              }));
            }
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {currentStep === 1 && (
          <PatientProfile
            fname={fname}
            setFname={setFname}
            lname={lname}
            setLname={setLname}
            dob={dob}
            setDOB={setDOB}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            id={id}
            setID={setID}
            phone_number={phone_number}
            setPhone={setPhone}
            province={province}
            setProvince={setProvince}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            district={district}
            setDistrict={setDistrict}
            sector={sector}
            setSector={setSector}
            cell={cell}
            setCell={setCell}
            errors={errors}
            handleNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <LabAndVitals
            glucose={glucose}
            setGlucose={setGlucose}
            hb={hb}
            setHb={setHb}
            fastglucose={fastglucose}
            setFastGlucose={setFastGlucose}
            creatinine={creatinine}
            setCreatinine={setCreatinine}
            temp={temp}
            setTemp={setTemp}
            BP={BP}
            setBP={setBP}
            HR={HR}
            setHR={setHR}
            O2={O2}
            setO2={setO2}
            errors={errors}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <AdditionalInfo
            doctor_comment={doctor_comment}
            setDoctorComment={setDoctorComment}
            state={state}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
            handlePrevious={handlePrevious}
          />
        )}
      </Box>
    </form>
  );
}

export default NewDiab;
