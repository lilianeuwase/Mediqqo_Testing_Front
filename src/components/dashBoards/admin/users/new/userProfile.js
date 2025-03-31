import React, { useState, useEffect } from "react";
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
import Card from "../../../doctor/components/card/Card"; // adjust the import path as needed

export default function UserProfile() {
  // State variables for input fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [hospital, setHospital] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  // New state for head shot file (base64 string)
  const [headShot, setHeadShot] = useState(null);

  // State for error messages
  const [errors, setErrors] = useState({});

  // Modal state variables for alerts
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // API host state
  const [apiHost, setApiHost] = useState("");

  // Allowed user types
  const allowedUserTypes = [
    "Physician",
    "Doctor",
    "Super Admin",
    "Admin",
    "Lab Technician",
    "Nurse",
    "Pharmacist",
  ];

  // Chakra color mode values
  const textColor = useColorModeValue("navy.700", "white");

  // Client-side validation function
  const validateForm = () => {
    const newErrors = {};

    if (!fname.trim()) newErrors.fname = "First name is required";
    if (/\d/.test(fname)) newErrors.fname = "First name cannot contain numbers";
    if (!lname.trim()) newErrors.lname = "Last name is required";
    if (/\d/.test(lname)) newErrors.lname = "Last name cannot contain numbers";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    if (!/^\d{10,}$/.test(phone_number))
      newErrors.phone_number = "Phone number must have at least 10 digits";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!userType) newErrors.userType = "User type is required";
    else if (!allowedUserTypes.includes(userType))
      newErrors.userType = "Invalid user type selected";

    // For Admin user type, require a valid secret key
    if (userType === "Admin" && secretKey !== "Mediqo") {
      newErrors.secretKey = "Invalid Admin Secret Key";
    }

    // For specific user types, Speciality and Hospital are required
    if (["Physician", "Doctor", "Lab Technician", "Nurse"].includes(userType)) {
      if (!speciality.trim()) newErrors.speciality = "Speciality is required";
      if (!hospital.trim()) newErrors.hospital = "Hospital is required";
    }

    return newErrors;
  };

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

  // Handle file change for head shot upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeadShot(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    // Debug log
    console.log(
      fname,
      lname,
      email,
      phone_number,
      speciality,
      hospital,
      password,
      userType,
      todayDate,
      headShot
    );

    // Send the form data to the backend, including headShot
    fetch(`${apiHost}/registerUser`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({
        fname,
        lname,
        email,
        phone_number,
        speciality,
        hospital,
        password,
        userType,
        registerDate: todayDate,
        headShot,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          setModalMessage("Registration Successful");
        } else {
          setModalMessage("Something went wrong");
        }
        setModalOpen(true);
      })
      .catch((err) => {
        console.error("Error:", err);
        setModalMessage("Something went wrong");
        setModalOpen(true);
      });
  };

  // Load API host from a text file
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card p="20px">
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="16px">
            {/* Last Name */}
            <FormControl isInvalid={errors.lname}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Last Name{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={lname}
                type="text"
                placeholder="Last Name"
                variant="flushed"
                onChange={(e) => setLname(e.target.value)}
              />
              {errors.lname && (
                <FormErrorMessage>{errors.lname}</FormErrorMessage>
              )}
            </FormControl>

            {/* First Name */}
            <FormControl isInvalid={errors.fname}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                First Name{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={fname}
                type="text"
                placeholder="First Name"
                variant="flushed"
                onChange={(e) => setFname(e.target.value)}
              />
              {errors.fname && (
                <FormErrorMessage>{errors.fname}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="16px">
            {/* User Type Drop Down */}
            <FormControl isInvalid={errors.userType}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                User Type{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Select
                placeholder="Select User Type"
                isRequired
                fontSize="sm"
                mb="12px"
                size="lg"
                variant="flushed"
                onChange={(e) => setUserType(e.target.value)}
              >
                {allowedUserTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              {errors.userType && (
                <FormErrorMessage>{errors.userType}</FormErrorMessage>
              )}
            </FormControl>
            {/* Phone Number */}
            <FormControl isInvalid={errors.phone_number}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Phone Number{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={phone_number}
                type="text"
                placeholder="Phone Number"
                variant="flushed"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phone_number && (
                <FormErrorMessage>{errors.phone_number}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="16px">
            {/* Profile Picture */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Profile Picture
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                variant="flushed"
                onChange={handleFileChange}
              />
            </FormControl>
            {/* Email Address */}
            <FormControl isInvalid={errors.email}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Email Address{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={email}
                type="email"
                placeholder="Enter email"
                variant="flushed"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="16px">
            {/* Password */}
            <FormControl isInvalid={errors.password}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Password{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={password}
                type="password"
                placeholder="Enter password"
                variant="flushed"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            {/* Confirm Password */}
            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Confirm Password{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={confirmPassword}
                type="password"
                placeholder="Confirm password"
                variant="flushed"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              )}
            </FormControl>

            {/* Secret Key for Admin/Super Admin */}
            {(userType === "Admin" || userType === "Super Admin") && (
              <FormControl isInvalid={errors.secretKey}>
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Secret Key
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Secret Key"
                  variant="flushed"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                {errors.secretKey && (
                  <FormErrorMessage>{errors.secretKey}</FormErrorMessage>
                )}
              </FormControl>
            )}
          </SimpleGrid>
          {/* Speciality and Hospital for specific user types */}
          {[
            "Physician",
            "Doctor",
            "Lab Technician",
            "Nurse",
            "Pharmacist",
          ].includes(userType) && (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="16px">
              <FormControl isInvalid={errors.speciality}>
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Speciality
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Speciality"
                  variant="flushed"
                  onChange={(e) => setSpeciality(e.target.value)}
                />
                {errors.speciality && (
                  <FormErrorMessage>{errors.speciality}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.hospital}>
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Hospital
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Hospital"
                  variant="flushed"
                  onChange={(e) => setHospital(e.target.value)}
                />
                {errors.hospital && (
                  <FormErrorMessage>{errors.hospital}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
          )}

          <Flex justify="flex-end" mt="20px">
            <Button variant="brand" onClick={handleSubmit}>
              Register
            </Button>
          </Flex>
        </form>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalMessage}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setModalOpen(false)}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
