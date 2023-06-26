import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PointInfo = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full gap-3">
      <Typography sx={{ fontSize: 40, fontWeight: 700, textAlign: "center" }}>
        GIẤY BÁO ĐIỂM KỲ THI TỐT NGHIỆP THPT NĂM 2023
      </Typography>{" "}
      <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
        THÔNG TIN DỰ THI
      </Typography>{" "}
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
      </div>{" "}
      <Typography sx={{ fontSize: 32, fontWeight: 700 }}>Kết quả</Typography>
      <div className="flex flex-row items-center gap-8">
        {currentUser.exam_info.point_list.map((point) => (
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
            {point.name}: {point.point}
          </Typography>
        ))}
      </div>{" "}
      <Typography sx={{ fontSize: 32, fontWeight: 700 }}>
        Trúng tuyển
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                  STT
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                  Mã trường
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                  Mã ngành
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                  Trạng thái
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUser?.exam_info?.pass_list.map((major, index) => (
              <TableRow key={`major ${index}`}>
                <TableCell>
                  <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
                    {index}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
                    {major.school_id}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
                    {major.majors_id}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: major.status === "T" ? "#FF0000" : "",
                    }}
                  >
                    {major.status === "T" ? "Trúng tuyển" : major.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex flex-col gap-3">
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 700,
            color: "#FF0000",
          }}
        >
          Lưu ý
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          X: Không đủ tiêu tiêu chí để trúng tuyển.
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span className="text-[#FF0000]">Trúng tuyển:</span> Đã trúng tuyển.
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          O: Đã trúng tuyển nguyện vọng có mức ưu tiên cao hơn.
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
    </div>
  );
};

export default PointInfo;
