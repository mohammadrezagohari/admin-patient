import { useQuery } from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";
const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};
const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const getWorkspace = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = apiClient
    .get(`/workspace`, {
      headers: auth_header,
    })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response;
    });
  return response;
};

export const createWorkspace = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = apiClient
    .post(
      `/workspace/store`,
      {
        title: values.title,
        city_id: values.city_id,
      },

      {
        headers: auth_header_files,
      }
    )
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response;
    });
  return response;
};

export const showWorkspace = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`workspace/show/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const updateWorkspace = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `workspace/update/${id}`,
    {
      title: values.title,
      city_id: values.city_id,
    },
    {
      headers: auth_header_files,
    }
  );
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const deleteWorkspace = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`workspace/delete/${id}`, {
    headers: auth_header_files,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};
