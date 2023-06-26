import {
  Backdrop,
  Button,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import { useToggle } from "@uidotdev/usehooks";
import MyInput from "components/MyInput";
import MySelect from "components/MySelect";
import useAPI from "hooks/useApi";
import useGetUser from "hooks/useGetUser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { commune_list, district_list, province_list } from "services/data";
import { updateUser } from "services/user";

const StudentContactInfo = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    household: {
      phone: "",
      province: "",
      district: "",
      commune: "",
      house_number: "",
    },
    contact: {
      phone: "",
      province: "",
      district: "",
      commune: "",
      house_number: "",
    },
  });
  const getUser = useGetUser();
  const [sameAddress, toggleSameAddress] = useToggle(false);
  const updateRequest = useAPI({ queryFn: (payload) => updateUser(payload) });
  const isFormComplete = () => {
    if (
      !(
        formValue.household.phone.length &&
        formValue.household.province.length &&
        formValue.household.district.length &&
        formValue.household.commune.length &&
        formValue.household.house_number.length
      )
    )
      return false;
    if (sameAddress) return true;
    if (
      !(
        formValue.contact.phone.length &&
        formValue.contact.province.length &&
        formValue.contact.district.length &&
        formValue.contact.commune.length &&
        formValue.contact.house_number.length
      )
    )
      return false;
    return true;
  };
  const handleUpdate = () => {
    updateRequest
      .run({
        contact_info: {
          contact: sameAddress ? formValue.household : formValue.contact,
          household: formValue.household,
        },
      })
      .then((res) => {
        getUser.run();
        toast.success("Cập nhật thành công");
        navigate("/priority");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (currentUser)
      setFormValue({
        ...formValue,
        ...currentUser?.contact_info,
        contact_email: currentUser?.email,
      });
  }, [currentUser]);

  const handleHouseHoldChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      household: { ...prev.household, [name]: value },
    }));
  };
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };
  if (!formValue) return <></>;
  if (currentUser.register_contest_form)
    return <Navigate to="/register_contest" />;
  return (
    <div className="flex flex-col p-8 border-[1px] border-[#D3D3D3] rounded-[12px] gap-3">
      <Backdrop sx={{ zIndex: 20 }} open={updateRequest.loading}>
        <CircularProgress sx={{ color: "#fff" }} />
      </Backdrop>
      <div className="flex flex-row gap-7">
        <MyInput
          readOnly
          disabled
          label="Email liên lạc"
          value={formValue.contact_email}
        />
      </div>
      <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
        Thông tin địa chỉ hộ khẩu
      </Typography>
      <div className="flex flex-row gap-7">
        <MySelect
          label="Tỉnh/Thành phố hộ khẩu"
          optionList={province_list}
          value={formValue?.household?.province}
          onChange={handleHouseHoldChange}
          name="province"
        />
        <MySelect
          label="Quận/Huyện hộ khẩu"
          disabled={!formValue.household.province}
          optionList={district_list[formValue?.household?.province]}
          value={formValue?.household?.district}
          onChange={handleHouseHoldChange}
          name="district"
        />
        <MySelect
          label="Phường/xã hộ khẩu"
          optionList={
            commune_list[formValue?.household?.province][
              formValue?.household?.district
            ]
          }
          disabled={!formValue?.household?.district}
          value={formValue?.household?.commune}
          onChange={handleHouseHoldChange}
          name="commune"
        />
        <MyInput
          label="Số nhà"
          value={formValue?.household?.house_number}
          onChange={handleHouseHoldChange}
          name="house_number"
        />
        <MyInput
          label="Điện thoại liên lạc"
          value={formValue?.household?.phone}
          name="phone"
          onChange={handleHouseHoldChange}
        />
      </div>
      <div className="flex flex-row items-center gap-8">
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
          Thông tin địa chỉ thường trú
        </Typography>
        <div className="flex flex-row items-center">
          <Switch checked={sameAddress} onChange={toggleSameAddress} />
          <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
            Giống như trên
          </Typography>
        </div>
      </div>
      {sameAddress ? (
        <></>
      ) : (
        <div className="flex flex-row gap-7">
          <MySelect
            label="Tỉnh/Thành phố thường trú"
            value={formValue?.contact?.province}
            optionList={province_list}
            onChange={handleContactChange}
            name="province"
          />
          <MySelect
            label="Quận/Huyện thường trú"
            value={formValue?.contact?.district}
            disabled={!formValue?.contact?.province}
            optionList={district_list[formValue?.contact?.province]}
            onChange={handleContactChange}
            name="district"
          />
          <MySelect
            label="Phường/xã thường trú"
            value={formValue?.contact?.commune}
            optionList={
              commune_list[formValue?.contact?.province][
                formValue?.contact?.district
              ]
            }
            disabled={!formValue?.contact?.district}
            onChange={handleContactChange}
            name="commune"
          />
          <MyInput
            label="Số nhà"
            value={formValue?.contact?.house_number}
            onChange={handleContactChange}
            name="house_number"
          />
          <MyInput
            label="Điện thoại liên lạc"
            value={formValue?.contact?.phone}
            name="phone"
            onChange={handleContactChange}
          />
        </div>
      )}
      <div className="flex flex-col bg-[#C4D0B9] py-5 px-4 rounded-r-[8px] border-l-[3px] border-l-[#253528] pt-3">
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          Trường hợp nếu đã chọn Phường/Xã ở ô trên thì không cần nhập lại tên
          Phường/Xã ở ô Số nhà, tên đường.
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          Trường hợp nếu tại ô Phường/Xã chọn Khác thì phải nhập tên Phường/Xã ở
          ô Số nhà, tên đường.
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          Địa chỉ liên lạc này được dùng để liên hệ khi cần thiết.
        </Typography>
      </div>
      <Button
        onClick={handleUpdate}
        disabled={!isFormComplete()}
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

export default StudentContactInfo;
