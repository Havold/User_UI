import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import MySelect from "components/MySelect";
import React, { useEffect, useRef, useState } from "react";
import { dantoc, nationality, tinh } from "services/data";
import UploadIcon from "assets/img/upload_icon.png";
import { useSelector } from "react-redux";
import useAPI from "hooks/useApi";
import { updateUser, updateUserCCCD } from "services/user";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const defaultForm = {
  name: "",
  birth: null,
  sex: "Nam",
  birth_place: "",
  nationality: "",
  nation: "",
  religion: "",
  CCCD: "",
  CCCD_create_date: null,
  CCCD_create_place: "",
  CCCD_front: null,
  CCCD_back: null,
};

const StudentInfo = () => {
  const [formValue, setFormValue] = useState(defaultForm);
  const updateRequest = useAPI({ queryFn: (payload) => updateUser(payload) });
  const updateCCCD = useAPI({ queryFn: (payload) => updateUserCCCD(payload) });
  const currentUser = useSelector((state) => state.currentUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = () => {
    updateRequest
      .run({
        sex: formValue.sex === "Nam",
        birth: formValue.birth,
        CCCD_detail: {
          date_provide: formValue.CCCD_create_date,
          provide_by: formValue.CCCD_create_place,
        },
        place_of_birth: formValue.birth_place,
        nationality: formValue.nationality,
        nation: formValue.nation,
        religion: formValue.religion,
      })
      .then((res) => {
        updateCCCD
          .run({
            CCCD_front: formValue.CCCD_front,
            CCCD_back: formValue.CCCD_back,
          })
          .then((res) => {
            toast.success("Cập nhật thành công");
          })
          .catch((err) => {
            toast.error("Cập nhật ảnh CCCD thất bại");
          });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (currentUser)
      setFormValue({
        name: currentUser.name,
        CCCD: currentUser.CCCD,
        birth: dayjs(currentUser.birth),
        sex: currentUser.sex ? "Nam" : "Nữ",
        birth_place: currentUser.place_of_birth,
        nationality: currentUser.nationality,
        nation: currentUser.nation,
        religion: currentUser.religion,
        CCCD_create_date: dayjs(currentUser.CCCD_detail.date_provide),
        CCCD_create_place: currentUser.CCCD_detail.provide_by,
      });
  }, [currentUser]);

  return (
    <div className="flex flex-col p-8 border-[1px] border-[#D3D3D3] rounded-[12px] gap-3">
      <Backdrop
        sx={{ zIndex: 100 }}
        open={updateRequest.loading || updateCCCD.loading}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Backdrop>
      <div className="flex flex-row gap-7">
        <MyInput
          readOnly
          disabled
          label="Họ và tên"
          value={formValue.name}
          defaultValue={formValue.name}
          onChange={handleChange}
          name="name"
        />
        <MyInputDate
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, birth: value }))
          }
          label="Ngày sinh"
          value={formValue.birth}
          name="birth"
        />
      </div>
      <div className="flex flex-row items-center gap-7">
        <MySelect
          optionList={["Nam", "Nữ"]}
          label="Giới tính"
          value={formValue.sex}
          onChange={handleChange}
          name="sex"
        />
        <MySelect
          optionList={tinh}
          label="Tỉnh/ Thành phố nơi sinh"
          value={formValue.birth_place}
          onChange={handleChange}
          name="birth_place"
        />
      </div>
      <div className="flex flex-row items-center gap-7">
        <MySelect
          optionList={nationality}
          label="Quốc tịch"
          value={formValue.nationality}
          onChange={handleChange}
          name="nationality"
        />
        <MySelect
          optionList={dantoc}
          label="Dân tộc"
          value={formValue.nation}
          onChange={handleChange}
          name="nation"
        />
        <MyInput
          label="Tôn giáo"
          value={formValue.religion}
          onChange={handleChange}
          name="religion"
        />
      </div>{" "}
      <div className="flex flex-row items-center gap-7">
        <MyInput
          readOnly
          disabled
          label="Số CCCD"
          value={formValue.CCCD}
          onChange={handleChange}
          name="CCCD"
        />
        <MyInputDate
          label="Ngày cấp CCCD"
          value={formValue.CCCD_create_date}
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, CCCD_create_date: value }))
          }
          name="CCCD_create_date"
        />
        <MyInput
          label="Nơi cấp"
          value={formValue.CCCD_create_place}
          onChange={handleChange}
          name="CCCD_create_place"
        />
      </div>{" "}
      <div className="flex flex-row items-center gap-7">
        <InputImage
          placeholder={currentUser?.CCCD_detail?.CCCD_image_front}
          title="Ảnh mặt trước CCCD"
          setFile={(value) =>
            setFormValue((prev) => ({ ...prev, CCCD_front: value }))
          }
        />
        <InputImage
          placeholder={currentUser?.CCCD_detail?.CCCD_image_backside}
          title="Ảnh mặt sau CCCD"
          setFile={(value) =>
            setFormValue((prev) => ({ ...prev, CCCD_back: value }))
          }
        />
      </div>
      <div className="flex flex-col bg-[#C4D0B9] py-5 px-4 rounded-r-[8px] border-l-[3px] border-l-[#253528] pt-3">
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          Trường hợp không chọn được nơi sinh (không có trong danh sách) chọn
          <b>“Nơi sinh khác” và nhập đầy đủ thông tin như hướng dẫn.</b>
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          Trường hợp có nhu cầu đổi số <b>CMND/CCCD </b> vui lòng liên hệ số
          hotline hoặc gửi mail để được hỗ trợ.
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          Hình CMND/CCCD tải lên phải <b>rõ nội dung</b> và có kích thước{" "}
          <b> {">"} 400px.</b>
        </Typography>
      </div>
      <Button
        onClick={handleUpdate}
        disabled={
          !(
            formValue.birth &&
            formValue.birth_place &&
            formValue.sex &&
            formValue.nationality &&
            formValue.nation &&
            formValue.religion &&
            formValue.CCCD_create_date &&
            formValue.CCCD_create_place &&
            formValue.CCCD_front &&
            formValue.CCCD_back
          )
        }
        sx={{
          background: "#3F54D1",
          fontSize: 14,
          fontWeight: 400,
          color: "#fff",
          ":hover": {
            background: "#3F54D1",
          },
          marginLeft: "auto",
          "&.Mui-disabled": {
            background: "#F3EEEE",
          },
        }}
      >
        Lưu thông tin
      </Button>
    </div>
  );
};
const InputImage = ({ setFile, title, placeholder }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };
  return (
    <div className="flex flex-col gap-3 h-[300px] w-full items-center ">
      <Typography sx={{ fontSize: 16, fontWeight: 400 }}>{title}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: preview || placeholder ? "transparent" : "#828081",
          borderRadius: "8px",
          gap: "12px",
          overflow: "hidden",
        }}
      >
        <input
          ref={inputRef}
          className="w-0 h-0"
          type="file"
          onChange={handleFileChange}
        />
        {preview ? (
          <img
            alt=""
            className="absolute w-full h-full object-cover z-20"
            src={preview}
          />
        ) : placeholder ? (
          <img
            alt=""
            className="absolute w-full h-full object-cover z-20"
            src={placeholder}
          />
        ) : (
          <img alt="" className="w-[48px] h-auto" src={UploadIcon} />
        )}
      </Box>
      <Button
        onClick={() => inputRef.current.click()}
        sx={{ background: "#0F91D2B2", ":hover": { background: "#0F91D2B2" } }}
      >
        Chọn file
      </Button>
    </div>
  );
};
export default StudentInfo;
