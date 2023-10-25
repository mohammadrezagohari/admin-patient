import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getCities = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get("/city?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showCities = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/city/show/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateCity = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/city/update/${id}`,
    {
      name: values.name,
      slug: values.slug,
      province_id: values.province_id,
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

export const deleteCities = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/city/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getCitiesByProvince = async (provinceId, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    "/city/list_by_province",
    {
      province_id: provinceId,
      count: 999,
    },
    {
      headers: auth_header,
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response?.data;
};
