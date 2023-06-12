import React from "react";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { SvgIcon, Typography } from "@mui/material";

const AppBar = () => {
  return (
    <div className="flex flex-row bg-[#000] px-[40px] py-2">
      <SvgIcon
        component={Logo}
        inheritViewBox={true}
        sx={{ width: 300, height: "auto" }}
      />
      <div className="flex flex-row items-center ml-auto gap-6 mt-auto pb-3">
        <Typography sx={{ fontSize: 24, color: "#fff" }}>Đăng nhập</Typography>{" "}
        <Typography sx={{ fontSize: 24, color: "#fff" }}>Đăng ký</Typography>
      </div>
    </div>
  );
};

export default AppBar;
