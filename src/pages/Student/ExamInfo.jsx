import { Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExamInfo = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full gap-3">
      <Typography sx={{ fontSize: 40, fontWeight: 700, textAlign: "center" }}>
        GIẤY BÁO DỰ THI KỲ THI TỐT NGHIỆP THPT NĂM 2023
      </Typography>{" "}
      <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
        THÔNG TIN DỰ THI
      </Typography>
      <div className="flex flex-col gap-3">
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Số báo danh: <span className="font-[700]">{currentUser.id}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Ngày giờ thi:{" "}
          <span className="font-[700]">
            {dayjs(currentUser.exam_info.exam_date).format("DD/MM/YYYY")}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Địa điểm thi:{" "}
          <span className="font-[700]">{currentUser.exam_info.exam_venue}</span>
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Phòng thi:{" "}
          <span className="font-[700]">{currentUser.exam_info.exam_room}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Mã hồ sơ:{" "}
          <span className="font-[700]">
            {currentUser.register_contest_form.id}
          </span>
        </Typography>
      </div>
      <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
        THÔNG TIN CÁ NHÂN
      </Typography>
      <div className="grid grid-cols-2 gap-3">
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Tên: <span className="font-[700]">{currentUser.name}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Giới tính:{" "}
          <span className="font-[700]">{currentUser.sex ? "Nam" : "Nữ"}</span>
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Nơi sinh:{" "}
          <span className="font-[700]">{currentUser.place_of_birth}</span>
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Ngày sinh:{" "}
          <span className="font-[700]">
            {dayjs(currentUser.birth).format("DD/MM/YYYY")}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          CCCD: <span className="font-[700]">{currentUser.CCCD}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Ngày cấp:{" "}
          <span className="font-[700]">
            {dayjs(currentUser.CCCD_detail.date_provide).format("DD/MM/YYYY")}
          </span>
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Nơi cấp:{" "}
          <span className="font-[700]">
            {currentUser.CCCD_detail.provide_by}
          </span>
        </Typography>
      </div>
      <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
        THÔNG TIN LIÊN LẠC
      </Typography>
      <div className="flex flex-col gap-3">
        {" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Địa chỉ báo tin:{" "}
          <span className="font-[700]">
            {currentUser.contact_info.contact.commune +
              ", " +
              currentUser.contact_info.contact.district +
              ", " +
              currentUser.contact_info.contact.province}
            {}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Số điện thoại:{" "}
          <span className="font-[700]">
            {currentUser.contact_info.contact.phone}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Email: <span className="font-[700]">{currentUser.email}</span>
        </Typography>{" "}
      </div>{" "}
      <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#FF0000" }}>
        Lưu ý
      </Typography>{" "}
      <Typography sx={{ fontSize: 16, fontWeight: 400, color: "#FF0000" }}>
        1. Thí sinh phải có mặt tại phòng thi đúng thời gian quy định ghi trong
        giấy báo dự thi để làm thủ tục dự thi.
      </Typography>{" "}
      <Typography sx={{ fontSize: 16, fontWeight: 400, color: "#FF0000" }}>
        2. Khi đi thi, thí sinh cần mang theo những giấy tờ sau: Giấy báo dự thi
        (bản in từ website); Giấy tờ tùy thân mà thí sinh đã sử dụng để đăng ký
        dự thi (bản chính, còn hạn sử dụng): Chứng minh nhân dân, Căn cước công
        dân, Hộ chiếu. Thí sinh không có giấy tờ tùy thân sẽ không được phép
        tham dự kỳ thi.
      </Typography>{" "}
      <Typography sx={{ fontSize: 16, fontWeight: 400, color: "#FF0000" }}>
        3. Thí sinh đọc và làm theo các yếu cầu trong Quy định dành cho thí
        sinh.
      </Typography>
      <Button
        onClick={() => navigate("/register_contest")}
        sx={{
          background: "#FF0000",
          ":hover": { background: "#FF0000" },
          color: "#fff",
          marginLeft: "auto",
        }}
      >
        Quay lại
      </Button>
    </div>
  );
};

export default ExamInfo;
