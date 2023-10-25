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

export const getCourseByGrade = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(
    `/course/course-by-grade/${id}?count=1000`,
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    throw new Error(`Failed to get: ${response.status}`);
  }
  return response?.data;
};
export const getCourseByGradeAndField = async (
  grade_id,
  field_id,
  userToken
) => {
  const count = 999;
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(
    `/course/course-by-grade-field`,
    {
      field_id: field_id,
      grade_id: grade_id,
      count: count,
    },
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    throw new Error(`Failed to get: ${response.status}`);
  }
  return response?.data;
};

export const getCourse = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/course?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createCourse = async (
  title,
  field_id,
  grade_id,
  icon,
  background,
  description,
  userToken
) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/course/store`,
    {
      title: title,
      field_id: field_id,
      grade_id: grade_id,
      icon: icon,
      background: background,
      description: description,
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

export const showSingleCourse = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/course/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateCourse = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/course/update/${id}`,

    {
      headers: auth_header_files,
    },
    {
      title: values?.title,
      field_id: values?.field_id,
      grade_id: values?.grade_id,
      icon: values?.icon,
      background: values?.background,
      description: values?.description,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteCourse = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`/course/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
