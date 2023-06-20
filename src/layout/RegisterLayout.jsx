import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RegisterLayout = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const currentUser = useSelector((state) => state.currentUser);

  if (loginStatus.isChecking) return <CircularProgress />;
  if (!loginStatus.isLogin) return <Navigate to="/auth/login" />;
  if (!currentUser) return <CircularProgress />;
  return (
    <div className="flex flex-col  pt-4 gap-4 items-center w-full h-full p-8">
      <Typography
        sx={{
          fontSize: 50,
          fontWeight: 700,
          color: "#49654E",
        }}
      >
        KỲ THI TUYỂN SINH 2023
      </Typography>
      <div className="flex flex-col border-[1px] border-[#D3D3D3] rounded-[12px] w-full py-10 px-6 gap-8 pb-8">
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
