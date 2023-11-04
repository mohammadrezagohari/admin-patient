import { useQuery } from "react-query";
import apiClient from "../apiClient";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  // Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getCategory = async () => {
  const response = await apiClient.get("/category?count=100", {
    headers: header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const createCategory = async (name) => {
  const response = await apiClient.post(
    `/category/create`,
    {
      name: name,
    },
    {
      headers: header,
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
    headers: header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateCategory = async (id,values) => {
  const response = await apiClient.patch(
    `/category/update/${id}`,
    {
      name: values.name,
    },
    {
      headers: header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteCategory = async (id) => {
  const response = await apiClient.delete(`/category/delete/${id}`, {
    headers:header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


// -------------------------------------------------------------------

export const getCategorysList = async () => {
    const response = await apiClient.get("/category/list-user?count=100", {
      headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  

