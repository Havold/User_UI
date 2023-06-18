import {
  Backdrop,
  Button,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import { useToggle } from "@uidotdev/usehooks";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import MySelect from "components/MySelect";
import dayjs from "dayjs";
import useAPI from "hooks/useApi";
import useGetUser from "hooks/useGetUser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { district_list, province_list } from "services/data";
import { updateUser } from "services/user";

const StudentPriorityInfo = () => {
  const navigate = useNavigate();
  const getUser = useGetUser();
  const currentUser = useSelector((state) => state.currentUser);
  const [formValue, setFormValue] = useState(defaultValue);
  const [samePlace, toggleSamePlace] = useToggle(false);
  const updateRequest = useAPI({ queryFn: (payload) => updateUser(payload) });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = () => {
    updateRequest
      .run({ priority_info: { ...formValue } })
      .then((res) => {
        getUser.run();
        toast.success("Cập nhật thành công");
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (currentUser) {
      setFormValue({
        ...(currentUser.priority_info
          ? currentUser.priority_info
          : defaultValue),
      });
    }
  }, [currentUser]);
  return (
    <div className="flex flex-col p-8 border-[1px] border-[#D3D3D3] rounded-[12px] gap-3">
      <Backdrop sx={{ zIndex: 20 }} open={updateRequest.loading}>
        <CircularProgress sx={{ color: "#fff" }} />
      </Backdrop>
      <InputGradeInfo
        grade={10}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <div className="flex flex-row items-center gap-3">
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Giống với lớp 10
        </Typography>
        <Switch value={samePlace} onChange={toggleSamePlace} />
      </div>
      {samePlace ? (
        <></>
      ) : (
        <>
          <InputGradeInfo
            grade={11}
            formValue={formValue}
            setFormValue={setFormValue}
          />
          <InputGradeInfo
            grade={12}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        </>
      )}

      <div className="flex flex-row items-center gap-3">
        <MySelect
          label={`Tình trạng tốt nghiệp`}
          value={formValue.graduation_status}
          optionList={[
            "Học sinh lớp 12",
            "Đã tốt nghiệp THPT",
            "Đối tượng khác",
          ]}
          onChange={handleChange}
          name="graduation_status"
        />
        <MyInputDate
          views={["year"]}
          label={`Năm tốt nghiệp`}
          value={dayjs(formValue.graduated_year)}
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, graduated_year: value }))
          }
        />
        <MySelect
          label={`Khu vực ưu tiên`}
          value={formValue.priority_area}
          optionList={["KV1", "KV2", "KV2-NT"]}
          onChange={handleChange}
          name="priority_area"
        />
        <MySelect
          label={`Đối tượng ưu tiên`}
          value={formValue.priority_object}
          optionList={["UT1", "UT2"]}
          onChange={handleChange}
          name="priority_object"
        />
      </div>
      <div className="flex flex-row gap-3 ml-auto">
        <Button
          onClick={() => navigate("/register_contest")}
          sx={{
            background: "#4FE0B5",
            fontSize: 14,
            fontWeight: 400,
            color: "#fff",
            ":hover": {
              background: "#4FE0B5",
            },
            marginLeft: "auto",
            "&.Mui-disabled": {
              background: "#F3EEEE",
            },
          }}
        >
          Trang đăng ký
        </Button>
        <Button
          onClick={handleUpdate}
          sx={{
            background: "#3F54D1",
            fontSize: 14,
            fontWeight: 400,
            color: "#fff",
            ":hover": {
              background: "#3F54D1",
            },
            "&.Mui-disabled": {
              background: "#F3EEEE",
            },
          }}
        >
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};
const InputGradeInfo = ({ grade, setFormValue, formValue }) => {
  const handleChangeGradeInfo = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [`grade_${grade}`]: { ...prev[`grade_${grade}`], [name]: value },
    }));
  };
  return (
    <div className="flex flex-row gap-7">
      <MySelect
        label={`Tỉnh/Thành phố lớp ${grade}`}
        optionList={province_list}
        value={formValue[`grade_${grade}`].province}
        onChange={(e) => handleChangeGradeInfo(e)}
        name="province"
      />
      <MySelect
        label={`Quận/Huyện lớp ${grade}`}
        optionList={district_list[formValue[`grade_${grade}`].province]}
        value={formValue[`grade_${grade}`].district}
        onChange={(e) => handleChangeGradeInfo(e)}
        name="district"
      />
      <MyInput
        label={`Trường học lớp ${grade}`}
        value={formValue[`grade_${grade}`].school_name}
        onChange={(e) => handleChangeGradeInfo(e)}
        name="school_name"
      />
    </div>
  );
};
const defaultValue = {
  graduation_status: "",
  priority_area: "",
  priority_object: "",
  graduated_year: "223",
  grade_10: {
    province: "",
    district: "",
    school_name: "",
  },
  grade_11: {
    province: "",
    district: "",
    school_name: "",
  },
  grade_12: {
    province: "",
    district: "",
    school_name: "",
  },
};
export default StudentPriorityInfo;
