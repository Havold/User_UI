import React from "react";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { Button, CircularProgress, SvgIcon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "services/auth";

const AppBar = () => {
  return (
    <div className="flex flex-row bg-[#000] px-[40px] py-2">
      <SvgIcon
        component={Logo}
        inheritViewBox={true}
        sx={{ width: 300, height: "auto" }}
      />
      <div className="flex flex-row items-center ml-auto gap-6 mt-auto pb-3">
        <UserAuth />
      </div>
    </div>
  );
};
const UserAuth = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  if (loginStatus.isChecking) return <CircularProgress />;
  if (loginStatus.isLogin)
    return (
      <Button sx={{ background: "#fff", ":hover": { background: "#fff" } }}>
        Logout
      </Button>
    );
  return (
    <>
      <Link to="/auth/login">
        <Typography sx={{ fontSize: 24, color: "#fff" }}>Đăng nhập</Typography>
      </Link>
      <Link to="/auth/register">
        <Typography sx={{ fontSize: 24, color: "#fff" }}>Đăng ký</Typography>
      </Link>
    </>
  );
};
export default AppBar;
