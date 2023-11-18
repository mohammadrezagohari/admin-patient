import { useQuery } from "react-query";
import apiClient from "../apiClient";

;
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

export const getPoster = async () => {
  const response = await apiClient.get("/poster?count=100", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const createPoster = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const { data, error, isLoading } = useData("poster/store");
  const response = await apiClient.post(
    `poster/store`,
    {
     poster: values.poster,
     title: values.title,
     category_id: values.category_id,
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

export const showPoster = async (id) => {
  const response = await apiClient.get(`poster/show/${id}`, {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const updateCategory = async (id, values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `poster/update/${id}`,
    {
      poster: values.poster,
      title: values.title,
      category_id: values.category_id,
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

export const deletePoster = async (id, userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`poster/delete/${id}`, {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};
