import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const auth_header_files = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

export const getQuestions = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/question?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createQuestions = async (formData, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/question/store_collection`,
    formData,

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

export const showSingleQuestion = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/question/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateQuestion = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/question/update/${id}`,
    {
      title: values?.title,
      level: values?.level,
      course: values?.course,
      units: values?.units,
      section: values?.section,
      grade: values?.grade,
      image: values?.image,
      video: values?.video,
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

export const deleteQuestions = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/question/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
