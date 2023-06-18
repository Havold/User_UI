import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Stepper = () => {
  const currentUser = useSelector((state) => state.currentUser);
  let index = 3;
  if (
    !currentUser.contact_info ||
    !currentUser.CCCD_detail ||
    !currentUser.priority_info
  )
    index = 1;
  else if (!currentUser.register_contest_form) index = 2;
  return (
    <div className="flex flex-row items-center gap-3">
      <StepItem title="Tạo hồ sơ" index={1} value={index} />
      <div className="h-[1px] w-full bg-[#D3D3D3]"></div>
      <StepItem title="Đăng ký" index={2} value={index} />
      <div className="h-[1px] w-full bg-[#D3D3D3]"></div>
      <StepItem title="Thanh toán" index={3} value={index} />
    </div>
  );
};
const StepItem = ({ title, index, value }) => {
  return (
    <div className="flex flex-row gap-2 items-center w-[150px] min-w-[150px]">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: value === index ? "#2760D3" : "#717171",
          borderRadius: "999px",
          width: "30px",
          height: "30px",
        }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: 400, color: "#fff" }}>
          {index}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 600,
          color: value === index ? "#2760D3" : "#717171",
        }}
      >
        {title}
      </Typography>
    </div>
  );
};

export default Stepper;
