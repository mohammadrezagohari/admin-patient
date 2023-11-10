import { useQuery } from "react-query";
import apiClient from "../apiClient";

// const header = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
//   // Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
// };
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

export const getCategory = async () => {
  const response = await apiClient.get("/category?count=100", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const createCategory = async (name, icon, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const { data, error, isLoading } = useData("category/store");
  const response = await apiClient.post(
    `category/store`,
    {
      name: name,
      icon: icon,
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

export const showCategory = async (id) => {
  const response = await apiClient.get(`category/show/${id}`, {
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
    `category/update/${id}`,
    {
      name: values.name,
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

export const deleteCategory = async (id, userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`category/delete/${id}`, {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

// -------------------------------------------------------------------

export const getCategorysList = async () => {
  const response = await apiClient.get("category?count=999", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};
