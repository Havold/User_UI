import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import NormalLayout from "layout/NormalLayout";
import Register from "pages/Register";
import Login from "pages/Login";
import StudentLayout from "layout/StudentLayout";
import AutoLogin from "components/AutoLogin";
import StudentInfo from "pages/Student/StudentInfo";
import AuthLayout from "layout/AuthLayout";
import StudentContactInfo from "pages/Student/StudentContactInfo";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AutoLogin />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<NormalLayout />}>
              <Route path="auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Navigate to="login" />} />
              </Route>
              <Route path="" element={<StudentLayout />}>
                <Route path="info" element={<StudentInfo />} />
                <Route path="contact" element={<StudentContactInfo />} />
                <Route index element={<Navigate to="info" />} />
                <Route path="*" element={<Navigate to="info" />} />
              </Route>{" "}
              <Route path="*" element={<Navigate to="" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
