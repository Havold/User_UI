import { Button, Typography } from "@mui/material";
import MySelect from "components/MySelect";
import React from "react";

const RegisterItem = () => {
  return (
    <div className="flex flex-col border-[#D3D3D3] border-[1px] rounded-[12px] p-7">
      <Typography sx={{ fontSize: 35, fontWeight: 600, color: "#253528" }}>
        Kỳ thi Tốt nghiệp THPT năm 2023
      </Typography>
      <MySelect label={"Tổ hợp môn"} optionList={["KHTN", "KHXH"]} />
      <Button sx={{ fontSize: 21, fontWeight: 700, color: "#09AD2D" }}>Đăng ký</Button>
    </div>
  );
};

export default RegisterItem;
