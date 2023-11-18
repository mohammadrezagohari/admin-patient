import { useQuery } from "react-query";
import apiClient from "../apiClient";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};
const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

export const getVideo = async () => {
  const response = await apiClient.get("/video?count=100", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const createVideo = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const { data, error, isLoading } = useData("video/store");
  const response = await apiClient.post(
    `poster/store`,
    {
     file_name: values.file_name,
     title: values.title,
     description: values.description,
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

export const showVideo = async (id) => {
  const response = await apiClient.get(`video/show/${id}`, {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const updateVideo = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `video/update/${id}`,
    {
     file_name: values.file_name,
     title: values.title,
     description: values.description,
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

export const deleteVideo = async (id, userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`video/delete/${id}`, {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};


