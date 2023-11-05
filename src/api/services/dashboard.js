import { useQuery } from "react-query";
import apiClient from "../apiClient";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

export const getArticleCount = async (userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("article/quantity", {
    headers: header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
export const getUserCount = async (userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("user/quantity", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};
export const getTutorialCount = async (userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("tutorial/quantity", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const getCategoryCount = async (userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("category/quantity", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};
