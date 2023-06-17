import { Box, CircularProgress, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as IconWarning } from "assets/icon/icon_warning.svg";
import { ReactComponent as IconUser } from "assets/icon/icon_user.svg";
import { ReactComponent as IconHome } from "assets/icon/icon_home.svg";
import { ReactComponent as IconEducation } from "assets/icon/icon_mortarboard.svg";
import React from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentLayout = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  if (loginStatus.isChecking) return <CircularProgress />;
  if (!loginStatus.isLogin) return <Navigate to="/auth/login" />;
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
      <div className="flex flex-col py-4 px-5 bg-[#FFF2C2] rounded-[12px]">
        <div className="flex flex-row items-center gap-2">
          <SvgIcon
            inheritViewBox={true}
            sx={{ width: 25, height: 25 }}
            component={IconWarning}
          />
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#9E7030" }}>
            Lưu ý:
          </Typography>
        </div>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#FF0000" }}>
          Thí sinh cần hoàn tất đăng ký hồ sơ (gồm thông tin cá nhân, thông tin
          liên lạc, thông tin ưu tiên).
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 400, color: "#9E7030" }}>
          Các thông tin nhập vào phải là tiếng Việt có dấu.
        </Typography>
      </div>
      <div className="flex flex-col border-[1px] border-[#D3D3D3] rounded-[12px] w-full py-10 px-6 gap-8">
        <div className="flex flex-row gap-24 items-center justify-center">
          <Tab pathname="/info" title="THÔNG TIN CÁ NHÂN" icon={IconUser} />
          <Tab pathname="/contact" title="THÔNG TIN LIÊN LẠC" icon={IconHome} />
          <Tab
            pathname="/priority"
            title="THÔNG TIN ƯU TIÊN"
            icon={IconEducation}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
const Tab = ({ pathname, icon, title }) => {
  const location = useLocation();
  const isSelect = location.pathname.indexOf(pathname) !== -1;
  return (
    <Link to={pathname}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          borderBottom: isSelect ? "3px solid #2760D3" : "3px solid #fff",
          padding: "0px 8px 12px 8px",
          color: isSelect ? "#2760D3" : "#5B5B5B",
          alignItems: "center",
        }}
      >
        <SvgIcon
          inheritViewBox={true}
          component={icon}
          sx={{ width: 18, height: 18 }}
        />
        <Typography
          sx={{ fontSize: 18, fontWeight: 600, fontFamily: "Poppins" }}
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
};
export default StudentLayout;
