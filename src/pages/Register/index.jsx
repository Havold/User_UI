import { Box, Button, SvgIcon, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import React, { useState } from "react";
import { ReactComponent as IconInfo } from "assets/icon/icon_info_circle.svg";
import { toast } from "react-toastify";
import { register } from "services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    CCCD: "",
    confirm_CCCD: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleRegister = () => {
    console.log(formValue.password !== formValue.confirm_password);
    if (formValue.CCCD === "") return toast.error("CCCD không thể trống");
    if (formValue.name === "") return toast.error("Tên không thể trống");
    if (formValue.password === "")
      return toast.error("Mật khẩu không thể trống");
    if (formValue.password !== formValue.confirm_password)
      return toast.error("Mật khẩu xác nhận sai");
    if (formValue.CCCD !== formValue.confirm_CCCD)
      return toast.error("CCCD xác nhận sai");
    setLoading(true);
    register({
      email: formValue.email,
      name: formValue.name,
      CCCD: formValue.CCCD,
      password: formValue.password,
    })
      .then((res) => {
        toast.success("Đăng ký thành công");
        navigate("/auth/login");
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex flex-col gap-5 pt-4 items-center w-full px-[40px] h-full">
      <Typography
        sx={{
          fontSize: 50,
          fontWeight: 700,
          color: "#49654E",
        }}
      >
        KỲ THI TUYỂN SINH 2023
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "24px",
          height: "100%",
          border: "1px solid #949494",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
          gap: "32px",
        }}
      >
        <Typography sx={{ fontSize: 48, fontWeight: 700, color: "#253528" }}>
          Đăng ký tài khoản
        </Typography>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-x-[50px] gap-y-[32px]">
            <MyInput
              placeholder={"Họ và tên"}
              onChange={handleChange}
              name="name"
            />
            <MyInput
              placeholder={"Địa chỉ email"}
              onChange={handleChange}
              name="email"
            />
            <MyInput
              placeholder={"Số CCCD/CMND"}
              onChange={handleChange}
              name="CCCD"
            />
            <MyInput
              name="confirm_CCCD"
              placeholder={"Xác nhận CCCD/CMND"}
              onChange={handleChange}
            />
            <MyInput
              type="password"
              name="password"
              placeholder={"Mật khẩu "}
              onChange={handleChange}
            />
            <MyInput
              type="password"
              name="confirm_password"
              placeholder={"Xác nhận mật khẩu"}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-4 px-8 bg-[#C4D0B980] rounded-[16px]">
            <div className="flex flex-row items-center gap-2">
              <SvgIcon
                component={IconInfo}
                inheritViewBox={true}
                sx={{ width: 14, height: 14 }}
              />
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, color: "#49654E" }}
              >
                Chú ý
              </Typography>
            </div>
            <Typography
              sx={{ fontSize: 20, fontWeight: 400, color: "#253528" }}
            >
              Nhập Họ và tên tiếng Việt có dấu.
            </Typography>
            <Typography
              sx={{ fontSize: 20, fontWeight: 400, color: "#253528" }}
            >
              Mật khẩu có độ dài 8-20 ký tự, bao gồm ký tự hoa, thường và chữ
              số.{" "}
            </Typography>
          </div>
          <div className="flex flex-row items-center gap-8 justify-center">
            <Button
              sx={{
                background: "#15CDCB",
                color: "#fff",
                borderRadius: "12px",
                ":hover": {
                  color: "#000",
                  border: "1px solid #15CDCB",
                },
              }}
              onClick={handleRegister}
              disabled={loading}
            >
              Đăng ký
            </Button>
            <Button
              sx={{
                background: "#4F92E0",
                color: "#fff",
                borderRadius: "12px",
                ":hover": {
                  color: "#000",
                  border: "1px solid #4F92E0",
                },
              }}
            >
              Quay về
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Register;
