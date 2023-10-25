import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getGrade = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/grade?count=100", {
    headers: auth_header,
  });
  console.log("our response: ", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createGrade = async (name, priority, field_id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/grade/store`,
    {
      name: name,
      priority: priority,
      field_id: field_id,
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

export const showGrades = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/grade/show/${id}`, {
    headers: auth_header,
  });

  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateGrade = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  console.log("values", values);
  const response = await apiClient.patch(
    `/grade/update/${id}`,
    {
      name: values.name,
      priority: values.priority,
      field_id: values.field_id
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

export const deleteGrade = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/grade/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

//---------------------------------------------------

export const getGradeByField = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/grade/grade_by_field/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
