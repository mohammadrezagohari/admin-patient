import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getPackageCoin = async () => {
  const response = await apiClient.get("/package?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createPackage = async (title, quantity) => {
  const response = await apiClient.post(
    `/package/store`,
    {
      title: title,
      quantity: quantity,
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

export const showPackage = async (id) => {
  const response = await apiClient.get(`/package/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updatePackageCoin = async (id, values) => {
  const response = await apiClient.patch(
    `/package/update/${id}`,
    {
      title: values.title,
      quantity: values.quantity,
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


export const deletePackageCoin = async (id) => {
    const response = await apiClient.delete(`/package/delete/${id}`, {
      headers: auth_header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
};