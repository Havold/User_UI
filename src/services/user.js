import { axiosForManagerAPI } from "./axios";

export const updateUser = async (payload) => {
  return await axiosForManagerAPI
    .request({
      method: "put",
      url: "/v1/student/current",
      data: payload,
    })
    .then((res) => res.data);
};
export const addMajor = async (payload) => {
  return await axiosForManagerAPI
    .request({
      method: "post",
      url: "/v1/student/current/major",
      data: payload,
    })
    .then((res) => res.data);
};
export const updateMajor = async (payload) => {
  return await axiosForManagerAPI
    .request({
      method: "put",
      url: "/v1/student/current/major",
      data: payload,
    })
    .then((res) => res.data);
};
export const deleteMajor = async (payload) => {
  return await axiosForManagerAPI
    .request({
      method: "delete",
      url: "/v1/student/current/major",
      data: payload,
    })
    .then((res) => res.data);
};
export const registerContest = async (payload) => {
  return await axiosForManagerAPI
    .request({
      method: "post",
      url: "/v1/student/current/register_contest",
      data: payload,
    })
    .then((res) => res.data);
};
export const updateUserCCCD = async (payload) => {
  const form_data = new FormData();
  form_data.append("cccd_image", payload.CCCD_front);
  form_data.append("cccd_image", payload.CCCD_back);
  return await axiosForManagerAPI
    .request({
      method: "put",
      url: "/v1/student/current/update_cccd_image",
      data: form_data,
    })
    .then((res) => res.data);
};
