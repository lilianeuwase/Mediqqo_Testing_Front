import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../common/components/card/Card";
import { UserData } from "../../../../../DBConnection/UserData";

function PatientProfile() {
  // ALL COUNTRIES
  const nonRwandaCountries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // Chakra color mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  // Declare doctor_name and hospital outside to use later
  const doctorName = UserData().fname + " " + UserData().lname;
  const hospitalName = UserData().hospital;

  // States for profile (Step 1)
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [ID, setID] = useState("");
  const [phone_number, setPhone] = useState("");
  // Address info states
  const [isRwandan, setIsRwandan] = useState("");
  const [village, setVillage] = useState("");
  const [province, setProvince] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [country, setCountry] = useState("");
  const [full_address, setAddress] = useState("");

  const [errors, setErrors] = useState({});

  // Modal state variables for pop-ups
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Load API host state
  const [apiHost, setApiHost] = useState("");

  // Helper: Calculate Age
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

  // Validation for profile fields
  const validateProfile = () => {
    let newErrors = {};
    // First Name validations
    if (!fname.trim()) newErrors.fname = "First Name is required";
    else if (/\d/.test(fname))
      newErrors.fname = "First Name cannot contain numbers";
    // Last Name validations
    if (!lname.trim()) newErrors.lname = "Last Name is required";
    else if (/\d/.test(lname))
      newErrors.lname = "Last Name cannot contain numbers";
    // Date of Birth validations (must be today or past)
    if (!DOB) newErrors.DOB = "Date of Birth is required";
    else {
      const DOBDate = new Date(DOB);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (DOBDate > today)
        newErrors.DOB = "Date of Birth cannot be in the future";
    }
    //Gender Validation
    if (!gender) newErrors.gender = "Gender is required";

    //ID Validation
    if (!ID.trim()) newErrors.ID = "ID is required";

    //Phone Number Validation
    if (!phone_number.trim())
      newErrors.phone_number = "Phone Number is required";
    else if (phone_number.trim().length < 10)
      newErrors.phone_number = "Phone Number must be at least 10 digits";

    //Resedence Validation
    if (!isRwandan)
      newErrors.isRwandan = "Please select if the patient resides in Rwanda";
    if (isRwandan === "rwandan") {
      if (!village.trim()) newErrors.village = "Village is required";
      if (!province) newErrors.province = "Province is required";
      if (!district) newErrors.district = "District is required";
      if (!sector.trim()) newErrors.sector = "Sector is required";
      if (!cell.trim()) newErrors.cell = "Cell is required";
    } else if (isRwandan === "non-rwandan") {
      if (!country) newErrors.country = "Country is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler to register the profile
  const handleRegister = () => {
    if (!validateProfile()) return;

    // Build full address based on nationality
    const address =
      isRwandan === "rwandan"
        ? `${village}, ${cell}, ${sector}, ${district}, ${province}, Rwanda`
        : country;
    setAddress(address);

    const age = DOB ? calculateAge(DOB) : null;

    // Get today's date in "DD/MM/YYYY HH:MM" 24-hour format
    const formatDate = (date) => {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    const todayDate = formatDate(new Date());

    // Send profile data to the Profile API
    fetch(
      `${apiHost}/registerDiabPatientProfile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname,
          lname,
          DOB,
          gender,
          ID,
          phone_number,
          full_address: address,
          age,
          consultations: 1,
          registerDate: todayDate,
          doctor_name: [doctorName],
          hospital: [hospitalName],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("patientPhone", phone_number);
          setIsSuccess(true);
          setModalTitle("Success");
          setModalMessage("Profile Registered Successfully");
          setModalOpen(true);
        } else {
          setIsSuccess(false);
          setModalTitle("Error");
          setModalMessage("Error: " + (data.error || "Registration failed"));
          setModalOpen(true);
        }
      });
  };

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  return (
    <form>
      <Box>
        <Card pt={{ base: "130px", md: "80px", xl: "50px" }}>
          <SimpleGrid columns="2" gap="20px">
            {/* First Name */}
            <FormControl isInvalid={errors.fname} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                First Name<Text color="red">*</Text>
              </FormLabel>
              <Input
                value={fname}
                isRequired
                fontSize="sm"
                type="text"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setFname(e.target.value)}
              />
              {errors.fname && (
                <FormErrorMessage>{errors.fname}</FormErrorMessage>
              )}
            </FormControl>
            {/* Last Name */}
            <FormControl isInvalid={errors.lname} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                Last Name<Text color="red">*</Text>
              </FormLabel>
              <Input
                value={lname}
                isRequired
                fontSize="sm"
                type="text"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setLname(e.target.value)}
              />
              {errors.lname && (
                <FormErrorMessage>{errors.lname}</FormErrorMessage>
              )}
            </FormControl>
            {/* Date of Birth */}
            <FormControl isInvalid={errors.DOB} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                Date of Birth<Text color="red">*</Text>
              </FormLabel>
              <Input
                value={DOB}
                isRequired
                fontSize="sm"
                type="date"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setDOB(e.target.value)}
              />
              {errors.DOB && <FormErrorMessage>{errors.DOB}</FormErrorMessage>}
            </FormControl>
            {/* Gender */}
            <FormControl isInvalid={errors.gender} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                Gender<Text color="red">*</Text>
              </FormLabel>
              <Select
                value={gender}
                placeholder="Select Gender"
                isRequired
                fontSize="sm"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              {errors.gender && (
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              )}
            </FormControl>
            {/* National ID */}
            <FormControl isInvalid={errors.ID} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                National ID<Text color="red">*</Text>
              </FormLabel>
              <Input
                value={ID}
                isRequired
                fontSize="sm"
                type="text"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setID(e.target.value)}
              />
              {errors.ID && <FormErrorMessage>{errors.ID}</FormErrorMessage>}
            </FormControl>
            {/* Phone Number */}
            <FormControl isInvalid={errors.phone_number} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                Phone Number<Text color="red">*</Text>
              </FormLabel>
              <Input
                value={phone_number}
                fontSize="sm"
                type="text"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone_number && (
                <FormErrorMessage>{errors.phone_number}</FormErrorMessage>
              )}
            </FormControl>
            {/* Residency */}
            <FormControl isInvalid={errors.isRwandan} mb="12px">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="4px"
              >
                Does the Patient Reside in Rwanda?<Text color="red">*</Text>
              </FormLabel>
              <Select
                value={isRwandan}
                placeholder="Select Answer"
                isRequired
                fontSize="sm"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => {
                  setIsRwandan(e.target.value);
                  // Reset address fields when switching
                  setVillage("");
                  setProvince("");
                  setDistrict("");
                  setSector("");
                  setCell("");
                  setCountry("");
                }}
              >
                <option value="rwandan">Yes</option>
                <option value="non-rwandan">No</option>
              </Select>
              {errors.isRwandan && (
                <FormErrorMessage>{errors.isRwandan}</FormErrorMessage>
              )}
            </FormControl>
            {/* Address fields based on residency */}
            {isRwandan === "rwandan" ? (
              <>
                <FormControl isInvalid={errors.province} mb="12px">
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="4px"
                  >
                    Province<Text color="red">*</Text>
                  </FormLabel>
                  <Select
                    value={province}
                    placeholder="Choose Province"
                    isRequired
                    fontSize="sm"
                    mb="12px"
                    size="lg"
                    variant="flushed"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedProvince(value);
                      setProvince(value);
                      // Reset subsequent address fields
                      setDistrict("");
                      setSector("");
                      setCell("");
                    }}
                  >
                    <option value="kigalicity">Kigali City</option>
                    <option value="northern">Northern</option>
                    <option value="southern">Southern</option>
                    <option value="western">Western</option>
                    <option value="eastern">Eastern</option>
                  </Select>
                  {errors.province && (
                    <FormErrorMessage>{errors.province}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.district} mb="12px">
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="4px"
                  >
                    District<Text color="red">*</Text>
                  </FormLabel>
                  <Select
                    value={district}
                    placeholder="Choose District"
                    isRequired
                    fontSize="sm"
                    mb="12px"
                    size="lg"
                    variant="flushed"
                    isDisabled={!selectedProvince}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    {selectedProvince &&
                      {
                        kigalicity: ["Gasabo", "Kicukiro", "Nyarugenge"],
                        northern: [
                          "Burera",
                          "Gakenke",
                          "Gicumbi",
                          "Musanze",
                          "Rulindo",
                        ],
                        southern: [
                          "Gisagara",
                          "Huye",
                          "Kamonyi",
                          "Muhanga",
                          "Nyamagabe",
                          "Nyanza",
                          "Nyaruguru",
                          "Ruhango",
                        ],
                        western: [
                          "Karongi",
                          "Ngororero",
                          "Nyabihu",
                          "Nyamasheke",
                          "Rubavu",
                          "Rusizi",
                        ],
                        eastern: [
                          "Bugesera",
                          "Gatsibo",
                          "Kayonza",
                          "Kirehe",
                          "Ngoma",
                          "Nyagatare",
                          "Rwamagana",
                        ],
                      }[selectedProvince].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </Select>
                  {errors.district && (
                    <FormErrorMessage>{errors.district}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.sector} mb="12px">
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="4px"
                  >
                    Sector<Text color="red">*</Text>
                  </FormLabel>
                  <Input
                    value={sector}
                    isRequired
                    fontSize="sm"
                    type="text"
                    mb="12px"
                    size="lg"
                    variant="flushed"
                    onChange={(e) => setSector(e.target.value)}
                  />
                  {errors.sector && (
                    <FormErrorMessage>{errors.sector}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.cell} mb="12px">
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="4px"
                  >
                    Cell<Text color="red">*</Text>
                  </FormLabel>
                  <Input
                    value={cell}
                    isRequired
                    fontSize="sm"
                    type="text"
                    mb="12px"
                    size="lg"
                    variant="flushed"
                    onChange={(e) => setCell(e.target.value)}
                  />
                  {errors.cell && (
                    <FormErrorMessage>{errors.cell}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.village} mb="12px">
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="4px"
                  >
                    Village<Text color="red">*</Text>
                  </FormLabel>
                  <Input
                    value={village}
                    isRequired
                    fontSize="sm"
                    type="text"
                    mb="12px"
                    size="lg"
                    variant="flushed"
                    onChange={(e) => setVillage(e.target.value)}
                  />
                  {errors.village && (
                    <FormErrorMessage>{errors.village}</FormErrorMessage>
                  )}
                </FormControl>
              </>
            ) : isRwandan === "non-rwandan" ? (
              <FormControl isInvalid={errors.country} mb="12px">
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="4px"
                >
                  Country<Text color="red">*</Text>
                </FormLabel>
                <Select
                  value={country}
                  placeholder="Select Country"
                  isRequired
                  fontSize="sm"
                  mb="12px"
                  size="lg"
                  variant="flushed"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {nonRwandaCountries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
                {errors.country && (
                  <FormErrorMessage>{errors.country}</FormErrorMessage>
                )}
              </FormControl>
            ) : null}
          </SimpleGrid>

          <Flex align="center" justify="flex-end">
            <Button
              variant="brand"
              _hover={{ bg: "brand.900" }}
              fontWeight="500"
              fontSize="16px"
              py="20px"
              px="27"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Flex>
        </Card>
      </Box>

      {/* Modal for centered pop-up alerts */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setModalOpen(false);
                if (isSuccess) {
                  window.location.href = "/admin/diabetes";
                }
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}

export default PatientProfile;
