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

export const getUnitExercise = async (userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get("/unit_exercise?count=1000", {
    headers: auth_header_files,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createUnitExercise = async (
  // field_id,grade_id,course_id,
  unit_id,
  image,
  userToken
) => {
    console.log('unit_id', unit_id);
    console.log('image', image);
    console.log('userToken', userToken);
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/unit_exercise/store`,
    {
      // field_id:field_id,
      // grade_id:grade_id,
      // course_id: course_id,
      unit_id: unit_id,
    //   user_id: user_id,
      image: image,
    },
    {
      headers: auth_header_files,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showUnitExercises = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/unit_exercise/show/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateUnitExercise = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `/unit_exercise/update/${id}`,
    {
      // field_id: values?.field_id,
      // grade_id:values?.grade_id,
      // course_id:values?.course_id,
      unit_id: values?.unit_id,
      user_id: values?.user_id,
      image: values.image,
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

export const deleteUnitExercise = async (id, userrToken) => {
  auth_header.Authorization = `Bearer ${userrToken}`;

  const response = await apiClient.delete(`/unit_exercise/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
