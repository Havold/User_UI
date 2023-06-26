import {
  Button,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomModal from "components/CustomModal";
import { useState } from "react";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import { ReactComponent as IconArrowDw } from "assets/icon/icon_arrow_down.svg";

import { useSelector } from "react-redux";
import MyInput from "components/MyInput";
import useAPI from "hooks/useApi";
import { addMajor, deleteMajor, updateMajor } from "services/user";
import { toast } from "react-toastify";
import useGetUser from "hooks/useGetUser";

const RegisterMajor = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col border-[#D3D3D3] border-[1px] rounded-[12px] p-7 gap-6">
      <Typography sx={{ fontSize: 35, fontWeight: 600, color: "#253528" }}>
        Đăng ký nguyện vọng
      </Typography>{" "}
      <Button
        onClick={() => setOpen(true)}
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
      <MajorModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
const MajorModal = ({ open, onClose }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const [formValue, setFormValue] = useState({
    school_name: "",
    school_id: "",
    majors_name: "",
    majors_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const getUser = useGetUser();
  const addRequest = useAPI({ queryFn: (payload) => addMajor(payload) });
  const deleteRequest = useAPI({ queryFn: (payload) => deleteMajor(payload) });
  const updateRequest = useAPI({ queryFn: (payload) => updateMajor(payload) });

  const handleAdd = () => {
    addRequest
      .run(formValue)
      .then((res) => {
        toast.success("Thêm thành công");
        getUser.run();
      })
      .catch((err) => {});
  };
  const handleDelete = (current_index) => {
    deleteRequest
      .run({ current_index })
      .then((res) => {
        toast.success("Xóa thành công");
        getUser.run();
      })
      .catch((err) => {});
  };
  const handleUpdate = (current_index, new_index) => {
    updateRequest
      .run({ current_index, new_index })
      .then((res) => {
        toast.success("Cập nhật thành công");
        getUser.run();
      })
      .catch((err) => {});
  };
  return (
    <CustomModal open={open} onClose={onClose}>
      <div className="flex flex-col rounded-[12px] p-7 bg-[#fff] w-[700px] gap-7">
        <div className="flex flex-row items-center w-full">
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
            Danh sách nguyện vọng
          </Typography>
          <IconButton
            sx={{ width: 32, height: 32, marginLeft: "auto" }}
            onClick={onClose}
          >
            <SvgIcon
              component={IconClose}
              inheritViewBox={true}
              sx={{ width: "100%", height: "auto" }}
            />
          </IconButton>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ưu tiên</TableCell>
                <TableCell align="center">Ngành</TableCell>{" "}
                <TableCell align="center">Trường</TableCell>
                <TableCell align="center">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser?.register_contest_form?.preference_majors.map(
                (major, index) => (
                  <MajorItem
                    key={major.id}
                    index={index + 1}
                    {...major}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex flex-row gap-4">
          <MyInput
            value={formValue.school_name}
            label="Tên trường"
            name="school_name"
            onChange={handleChange}
          />
          <MyInput
            value={formValue.school_id}
            label="Mã trường"
            name="school_id"
            onChange={handleChange}
          />
          <MyInput
            value={formValue.majors_name}
            label="Tên ngành"
            name="majors_name"
            onChange={handleChange}
          />
          <MyInput
            value={formValue.majors_id}
            label="Mã ngành"
            name="majors_id"
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={
            !(
              formValue.majors_id.length &&
              formValue.majors_name.length &&
              formValue.school_id.length &&
              formValue.school_name.length
            ) || currentUser?.register_contest_form
          }
          sx={{
            fontSize: 21,
            fontWeight: 700,
            background: "#09AD2D",
            color: "#fff",
            width: 400,
            ":hover": { background: "#09AD2D  " },
          }}
        >
          Thêm nguyện vọng
        </Button>
      </div>
    </CustomModal>
  );
};
const MajorItem = ({ index, majors_name, school_name, onUpdate, onDelete }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const isDisable = currentUser?.register_contest_form;
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-row gap-1 items-center gap-2">
          <IconButton
            disabled={isDisable}
            sx={{ padding: 0, width: 18, height: 18 }}
            onClick={() => onUpdate(index - 1, index)}
          >
            <SvgIcon
              component={IconArrowDw}
              inheritViewBox={true}
              sx={{ width: "100%", height: "auto" }}
            />
          </IconButton>{" "}
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            {index}
          </Typography>
          {index !== 1 ? (
            <IconButton
              disabled={isDisable}
              onClick={() => onUpdate(index - 1, index - 2)}
              sx={{ padding: 0, rotate: "180deg", width: 18, height: 18 }}
            >
              <SvgIcon
                component={IconArrowDw}
                inheritViewBox={true}
                sx={{ width: "100%", height: "auto" }}
              />
            </IconButton>
          ) : (
            <></>
          )}
        </div>
      </TableCell>
      <TableCell align="center">{majors_name}</TableCell>
      <TableCell align="center">{school_name}</TableCell>
      <TableCell align="center">
        <IconButton
          disabled={isDisable}
          onClick={() => onDelete(index - 1)}
          sx={{ width: 16, height: 16, padding: 0 }}
        >
          <SvgIcon
            component={IconClose}
            inheritViewBox={true}
            sx={{ width: "100%", height: "auto" }}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default RegisterMajor;
