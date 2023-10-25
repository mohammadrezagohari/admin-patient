import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getCategorys = async () => {
  const response = await apiClient.get("/category?count=100", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const createCategory = async (name) => {
  const response = await apiClient.post(
    `/category/store`,
    {
      name: name,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showCategory = async (id) => {
  const response = await apiClient.get(`/category/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateCategorys = async (id,values) => {
  const response = await apiClient.patch(
    `/category/update/${id}`,
    {
      name: values.name,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteCategorys = async (id) => {
  const response = await apiClient.delete(`/category/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


// -------------------------------------------------------------------

export const getCategorysListUser = async () => {
    const response = await apiClient.get("/category/list-user?count=100", {
      headers: auth_header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  

