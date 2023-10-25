import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
const auth_header_files = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
export const getSlider = async () => {
  const response = await apiClient.get("/slider?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createSlider = async (
  title,
  priority_order,
  mime_type,
  file_size,
  file_url
) => {
  const response = await apiClient.post(
    `/slider/store`,
    {
      title: title,
      priority_order: priority_order,
      mime_type: mime_type,
      file_size: file_size,
      file_url: file_url,
    },
    {
      headers: auth_header_files,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showSliders = async (id) => {
  const response = await apiClient.get(`/slider/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateSlider = async (id, values) => {
  const response = await apiClient.patch(
    `/slider/update/${id}`,
    {
      title: values.title,
      priority_order: values.priority_order,
      mime_type: values.mime_type,
      file_size: values.file_size,
      file_url: values.file_url,
      // fileInfo: values.fileInfo,
      // mime_type: image?.type,
      // file_size: image?.size,
    },
    {
      headers: auth_header_files,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteSlider = async (id) => {
  const response = await apiClient.delete(`/slider/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
