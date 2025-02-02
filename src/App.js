import "../src/components/doctorDashBoard/assets/css/AppUser.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ChakraProvider,
  // extendTheme
} from "@chakra-ui/react";
import "../src/components/doctorDashBoard/assets/css/AppUser.css";
import { Navigate } from "react-router-dom";
import {} from "react-router-dom";
import AuthLayout from "./components/doctorDashBoard/layouts/auth";
import AdminLayout from "./components/doctorDashBoard/layouts/admin";
import RTLLayout from "./components/doctorDashBoard/layouts/rtl";
import initialTheme from "./components/doctorDashBoard/theme/theme"; //  { themeGreen }
import { useState } from "react";
import HomePage from "./pages/homepage";
import UserDetails from "./components/userDetails";

//Customized Links
import SignInCentered from "./components/doctorDashBoard/views/auth/signIn";


function AppUpdate() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [currentTheme, setCurrentTheme] = useState(initialTheme); //Chakra
  return (
    //Chakra
    <ChakraProvider theme={currentTheme}>
      <Router>
        <div className="AppUpdate">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="auth/*" element={<AuthLayout />} />
            <Route
              path="admin/*"
              element={
                isLoggedIn == "true" ? (
                  <AdminLayout
                    theme={currentTheme}
                    setTheme={setCurrentTheme}
                  />
                ) : (
                  <Navigate to="/auth/sign-in" replace />
                )
              }
            />
            <Route
              path="rtl/*"
              element={
                <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
              }
            />
            <Route path="/admin" element={<Navigate to="/admin/default" replace />} />
            {/* Customize additions */}
            <Route
              exact
              path="/auth/sign-in"
              element={
                isLoggedIn == "true" ? (
                  <Navigate to="/admin/default" replace />
                ) : (
                  <SignInCentered />
                )
              }
            />

            {/* Old Routes */}
            {/* Diabetes */}
            {/* <Route
              exact
              path="/admin/diabetes/newconsult"
              element={
                isLoggedIn == "true" ? (
                  <Profile />
                ) : (
                  <SignInCentered />
                )
              }
            /> */}
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default AppUpdate;
