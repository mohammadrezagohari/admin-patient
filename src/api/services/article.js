import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
  // Authorization: `Bearer ${localStorage.getItem("_token_admin")}`,
};

export const getArticle = async () => {
  const response = await apiClient.get("/article?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showArticle = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/article/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createArticle = async (context, title, category_id) => {
  const response = await apiClient.post(
    `/article/store`,
    {
      context: context,
      title: title,
      category_id: category_id,
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

// ----------------------------------------------------------------------------

export const updateArticle = async (values, id) => {
  // auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/article/update/${id}`,

    {
      headers: auth_header,
    },
    {
      title: values?.title,
      context: values?.context,
      category_id: values?.category_id,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteArticle = async (id) => {
  // auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`/article/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
