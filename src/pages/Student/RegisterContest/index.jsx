import React from "react";
import StudentInfo from "./StudentInfo";
import RegisterStatus from "./RegisterStatus";
import RegisterMajor from "./RegisterMajor";

const RegisterContest = () => {
  return (
    <div className="flex flex-col gap-7">
      <StudentInfo />
      <RegisterStatus />
      <RegisterMajor />
    </div>
  );
};

export default RegisterContest;
