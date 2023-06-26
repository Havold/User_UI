import { Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudentInfo = () => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center">
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
          Thông tin thí sinh
        </Typography>
        <Link style={{ marginLeft: "auto" }} to="/info">
          <Typography
            sx={{ ml: "auto", fontSize: 16, fontWeight: 600, color: "#2760D3" }}
          >
            Sửa thông tin
          </Typography>
        </Link>
      </div>
      <div className="grid grid-cols-3 border-[1px] border-[#D3D3D3] rounded-[12px] w-full py-6 px-6 gap-8">
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Họ và tên: <span className="font-[400]">{currentUser?.name}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Ngày sinh:{" "}
          <span className="font-[400]">
            {dayjs(currentUser?.birth).format("DD/MM/YYYY")}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Nơi sinh:{" "}
          <span className="font-[400]">{currentUser?.place_of_birth}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Số CCCD: <span className="font-[400]">{currentUser?.CCCD}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Ngày cấp:{" "}
          <span className="font-[400]">
            {dayjs(currentUser?.CCCD_detail?.date_provide).format("DD/MM/YYYY")}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Nơi cấp:{" "}
          <span className="font-[400]">
            {currentUser?.CCCD_detail?.provide_by}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Giới tính:{" "}
          <span className="font-[400]">{currentUser?.sex ? "Nam" : "Nữ"}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Điện thoại:{" "}
          <span className="font-[400]">
            {currentUser?.contact_info?.contact.phone}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Địa chỉ hộ khẩu:{" "}
          <span className="font-[400]">
            {currentUser?.contact_info?.household.commune} ,{" "}
            {currentUser?.contact_info?.household.district} ,{" "}
            {currentUser?.contact_info?.household.province}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Địa chỉ liên lạc:{" "}
          <span className="font-[400]">
            {currentUser?.contact_info?.contact.commune} ,{" "}
            {currentUser?.contact_info?.contact.district} ,{" "}
            {currentUser?.contact_info?.contact.province}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Tổ hợp môn:{" "}
          <span className="font-[400]">
            {currentUser.register_contest_form.exam_type}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default StudentInfo;
