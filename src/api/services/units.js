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
export const getUnits = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get("/unit?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return "error";
  }
  return response?.data;
};

export const getUnitsByCourse = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(
    `/unit/units-by-course/${id}?count=100`,
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    return "error";
  }
  return response?.data;
};

export const createUnit = async (
  title,
  course_id,
  grade_id,
  field_id,
  image,
  userToken
) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `/unit/store`,
    {
      title: title,
      course_id: course_id,
      grade_id: grade_id,
      field_id: field_id,
      image: image,
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

export const showUnits = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/unit/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateUnit = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/unit/update/${id}`,
    {
      title: values.title,
      course_id: values.course_id,
      grade_id: values.grade_id,
      field_id: values?.field_id,
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

export const deleteUnit = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/unit/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

// export const getCitiesByProvince = async (ProvinceId) => {
//   const response = await apiClient.post("/city/list_by_province?count=100", {
//     headers: auth_header,
//     province_id: ProvinceId,
//   });

//   if (response.status !== 200) {
//     throw new Error("Failed to fetch data");
//   }
//   console.log('cities',response.data);
//   return response?.data;
// };
