import { useQuery } from "react-query";
import apiClient from "../apiClient";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};

export const getTutorials = async (name, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get("/tutorial?count=100", {
    headers: header,
    name: name,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showTutorials = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/tutorial/show/${id}`, {
    headers: header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createTutorials = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `/tutorial/create`,
    {
      context: values.context,
      title: values.title,
      category_id: values.category_id,
      main_title: values.main_title,
      first_title: values.first_title,
      first_context: values.first_context,
      second_title: values.second_title,
      second_context: values.second_context,
      image: values.image,
    },
    {
      headers: header,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

// ----------------------------------------------------------------------------

export const updateTutorials = async (values, id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `/tutorial/update/${id}`,

    {
      headers: header,
    },
    {
      context: values?.context,
      category_id: values?.category_id,
      category_id: values?.category_id,
      main_title: values?.main_title,
      first_title: values?.first_title,
      first_context: values?.first_context,
      second_title: values?.second_title,
      second_context: values?.second_context,
      image: values?.image,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteTutorilas = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`/tutorial/delete/${id}`, {
    headers: header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
