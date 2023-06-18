import React from "react";
import StudentInfo from "./StudentInfo";
import RegisterStatus from "./RegisterStatus";

const RegisterContest = () => {
  return (
    <div className="flex flex-col gap-7">
      <StudentInfo />
      <RegisterStatus />
    </div>
  );
};

export default RegisterContest;
