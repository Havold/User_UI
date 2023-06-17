import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import React from "react";

const InputInfo = () => {
  return (
    <div className="flex flex-col p-8 border-[1px] border-[#D3D3D3]">
      <div className="flex flex-row gap-7">
        <MyInput readOnly disabled label="Họ và tên" />
        <MyInputDate label="Ngày sinh" />
      </div>
    </div>
  );
};

export default InputInfo;
