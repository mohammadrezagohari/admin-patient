import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getSchool = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/school?count=1000", {
    headers: auth_header,
  });

  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createSchool = async (name) => {
  const response = await apiClient.post(
    `/school/store`,
    {
      name: name,
    },
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showSchools = async (id) => {
  const response = await apiClient.get(`/school/show/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateSchool = async (id, values) => {
  const response = await apiClient.patch(
    `/school/update/${id}`,
    {
      name: values.name,
    },
    {
      headers: auth_header,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteSchool = async (id) => {
  const response = await apiClient.delete(`/school/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
