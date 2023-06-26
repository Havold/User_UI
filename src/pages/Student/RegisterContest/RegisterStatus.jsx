import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import MySelect from "components/MySelect";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useAPI from "hooks/useApi";
import { registerContest } from "services/user";
import { toast } from "react-toastify";
import useGetUser from "hooks/useGetUser";
import { useNavigate } from "react-router-dom";

const RegisterStatus = () => {
  return (
    <div className="flex flex-col gap-7">
      <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
        Hồ sơ đăng ký
      </Typography>
      <Stepper />
      <RegisterItem />
    </div>
  );
};
const RegisterItem = () => {
  const getUser = useGetUser();
  const registerRequest = useAPI({
    queryFn: (payload) => registerContest(payload),
  });
  const [exam_type, setExamType] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  const handleRegister = () => {
    registerRequest
      .run({ exam_type: exam_type })
      .then((res) => {
        toast.success("Đăng ký thành công");
        getUser.run();
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (currentUser) {
      setExamType(currentUser?.register_contest_form?.exam_type);
    }
  }, [currentUser]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col border-[#D3D3D3] border-[1px] rounded-[12px] p-7 gap-6">
      <Backdrop sx={{ zIndex: 100 }} open={registerRequest.loading}>
        <CircularProgress sx={{ color: "#fff" }} />
      </Backdrop>
      <Typography sx={{ fontSize: 35, fontWeight: 600, color: "#253528" }}>
        Kỳ thi Tốt nghiệp THPT năm 2023
      </Typography>

      {currentUser?.register_contest_form ? (
        <>
          {" "}
          <Typography sx={{ fontSize: 20, fontWeight: 400, color: "#717171" }}>
            Thời gian đăng ký:{" "}
            <span className="font-[700] text-[#09AD2D]">
              {dayjs(currentUser.created_at).format("DD/MM/YYYY")}
            </span>
          </Typography>{" "}
          <Typography sx={{ fontSize: 20, fontWeight: 400, color: "#717171" }}>
            Mã hồ sơ:{" "}
            <span className="font-[700] text-[#FF0000]">
              {currentUser.register_contest_form.id}
            </span>
          </Typography>
        </>
      ) : (
        <></>
      )}
      <MySelect
        value={exam_type}
        onChange={(e) => setExamType(e.target.value)}
        readOnly={currentUser.register_contest_form}
        label={"Tổ hợp môn"}
        optionList={["KHTN", "KHXH"]}
      />
      {!currentUser?.register_contest_form ? (
        <Button
          disabled={!exam_type}
          onClick={handleRegister}
          sx={{
            fontSize: 21,
            fontWeight: 700,
            background: "#09AD2D",
            color: "#fff",
            ":hover": { background: "#09AD2D  " },
          }}
        >
          Đăng ký
        </Button>
      ) : (
        <></>
      )}
      <div className="flex flex-row items-center gap-2">
        {currentUser.exam_info ? (
          <Button
            onClick={() => navigate("/register_contest/exam_info")}
            sx={{
              background: "#3B80E9",
              ":hover": { background: "#3B80E9" },
              color: "#fff",
            }}
          >
            Giấy báo thi
          </Button>
        ) : (
          <></>
        )}
        {currentUser.exam_info?.point_list ? (
          <Button
            onClick={() => navigate("/register_contest/point_info")}
            sx={{
              background: "#FFB800",
              ":hover": { background: "#FFB800" },
              color: "#fff",
            }}
          >
            Giấy báo điểm
          </Button>
        ) : (
          <></>
        )}{" "}
      </div>
    </div>
  );
};
export default RegisterStatus;
