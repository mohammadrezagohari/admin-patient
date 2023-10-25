import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getSuggestion = async () => {
  const response = await apiClient.get("/suggestion?count=100", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

 
export const storeSuggestion = async (context) => {
  const response = await apiClient.post(
    `/suggestion/store`,
    {
      context: context,
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

export const showSuggestions = async (id) => {
  const response = await apiClient.get(`/suggestion/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
 
export const updateSuggestion = async (id,values) => {
  const response = await apiClient.patch(
    `/suggestion/update/${id}`,
    {
      context: values.context,
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

export const deleteSuggestion = async (id) => {
  const response = await apiClient.delete(`/suggestion/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};