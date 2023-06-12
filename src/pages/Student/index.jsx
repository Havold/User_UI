import { SvgIcon, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as IconWarning } from "assets/icon/icon_warning.svg";
const Student = () => {
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
      <div className="flex flex-col border-[1px] border-[#D3D3D3] rounded-[12px] h-[500px] w-full pt-10 px-6 gap-6">
        <div className="flex flex-row "></div>
      </div>
    </div>
  );
};

export default Student;
