import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getLevel = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get("/level?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getLevelBySection = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const count = 9999;
  const response = await apiClient.post(
    `/level/list`,
    {
      count: count,
      section_id: id,
    },
    {
      headers: auth_header,
    }
  );
  console.log("my result", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createLevel = async (
  title,
  // quantity_questions,
  // answer_quantity,
  section_id,
  order,
  userToken
) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `/level/store`,
    {
      title: title,
      // quantity_questions: quantity_questions,
      // answer_quantity:answer_quantity,
      section_id: section_id,
      order: order,
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

export const showLevels = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/level/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateLevel = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/level/update/${id}`,
    {
      title: values.title,
      // quantity_questions: values.quantity_questions,
      // answer_quantity: values.answer_quantity,
      section_id: values.section_id,
      order: values.order,
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

export const deleteLevel = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/level/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
