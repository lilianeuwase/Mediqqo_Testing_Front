import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
// React Icons imports
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// Custom components
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth2.png";

function SignIn() {
  // Login input and error states
  const [uniqueID, setUniqueID] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueIDError, setUniqueIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Overlays/popups states
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showRetrievingPopup, setShowRetrievingPopup] = useState(false);
  const [showUnrecognizedPopup, setShowUnrecognizedPopup] = useState(false);

  // Password visibility state
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [apiHost, setApiHost] = useState("");

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // When the "Retrieving data" overlay is active, wait 2 seconds then call the /userData API
  useEffect(() => {
    if (!apiHost) return;
    if (showRetrievingPopup) {
      const timer = setTimeout(() => {
         fetch(apiHost + "/userData", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // If API returns valid user data, redirect to /admin/default regardless of userType
            if (data.status === "ok" && data.data) {
              window.location.href = "/admin/default";
            } else {
              setShowRetrievingPopup(false);
              setShowUnrecognizedPopup(true);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data", error);
            setShowRetrievingPopup(false);
            setShowUnrecognizedPopup(true);
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showRetrievingPopup]);

  // Submit handler for login
  function handleSubmit(e) {
    e.preventDefault();
    // Reset error messages
    setUniqueIDError("");
    setPasswordError("");

    // Login API call
    fetch(apiHost + "/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uniqueID,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          // Step 1: Show "Logging in successfully" overlay for 2 seconds
          setShowSuccessPopup(true);
          setTimeout(() => {
            const token = data.data;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("loggedIn", true);
            // Step 2: Hide success overlay and wait 2 seconds before showing "Retrieving data" overlay
            setShowSuccessPopup(false);
            setTimeout(() => {
              setShowRetrievingPopup(true);
            }, 500);
          }, 1000);
        } else {
          const errorMsg = (data.error || data.message || "").toLowerCase();
          if (errorMsg.includes("user")) {
            setUniqueIDError("Username is incorrect");
          }
          if (errorMsg.includes("password")) {
            setPasswordError("Password is incorrect");
          }
          if (!errorMsg.includes("user") && !errorMsg.includes("password")) {
            setUniqueIDError("Username is incorrect");
            setPasswordError("Password is incorrect");
          }
        }
      })
      .catch((err) => {
        console.error("Error during login", err);
        setUniqueIDError("An error occurred. Please try again.");
        setPasswordError("An error occurred. Please try again.");
      });
  }

  // Chakra color mode values and original styling variables
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  return (
    <>
      {/* Logging in successfully Popup Overlay */}
      {showSuccessPopup && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex="9999"
        >
          <Box bg="white" p="20px" borderRadius="8px" boxShadow="lg" textAlign="center">
            <Heading size="md" color={textColor}>
              Logging in successfully
              <Spinner size="md" color="brand.600" ml="10px" />
            </Heading>
          </Box>
        </Flex>
      )}

      {/* Retrieving data Popup Overlay */}
      {showRetrievingPopup && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex="9999"
        >
          <Box bg="white" p="20px" borderRadius="8px" boxShadow="lg" textAlign="center">
            <Heading size="md" color={textColor}>
              Retrieving data
              <Spinner size="md" color="brand.600" ml="10px" />
            </Heading>
          </Box>
        </Flex>
      )}

      {/* Unrecognized UserType Popup Overlay */}
      {showUnrecognizedPopup && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex="9999"
        >
          <Box bg="white" p="20px" borderRadius="8px" boxShadow="lg" textAlign="center">
            <Heading size="md" color={textColor}>
              Unrecognized usertype, contact admin.
            </Heading>
          </Box>
        </Flex>
      )}

      <DefaultAuth illustrationBackground={illustration} image={illustration}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <form onSubmit={handleSubmit}>
            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Sign In{" "}
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Enter your username and password to sign in !
              </Text>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: "100%", md: "420px" }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: "auto", lg: "unset" }}
              me="auto"
              mb={{ base: "20px", md: "auto" }}
            >
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Username (System ID){" "}
                  <Text color={brandStars}> * </Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="012345"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  onChange={(e) => setUniqueID(e.target.value)}
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password <Text color={brandStars}> * </Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      onClick={handleClick}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
                      Forgot password ?
                    </Text>
                  </NavLink>
                </Flex>
                {(uniqueIDError || passwordError) && (
                  <Box mb="24px">
                    {uniqueIDError && (
                      <Text color="red.500" fontSize="sm" mt="2px">
                        {uniqueIDError}
                      </Text>
                    )}
                    {passwordError && (
                      <Text color="red.500" fontSize="sm" mt="2px">
                        {passwordError}
                      </Text>
                    )}
                  </Box>
                )}
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  type="submit"
                >
                  Sign In{" "}
                </Button>
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  Not registered yet ?{" "}
                  <NavLink to="/auth/sign-up">
                    <Text
                      color={textColorBrand}
                      as="span"
                      ms="5px"
                      fontWeight="500"
                    >
                      Inquire about an Account{" "}
                    </Text>
                  </NavLink>
                </Text>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </DefaultAuth>
    </>
  );
}

export default SignIn;