import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getAnswers = async () => {
  const response = await apiClient.get("/answer?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const createAnswer = async (field) => {
  const response = await apiClient.post(
    `/answer/store`,
    {
      name: field,
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

export const showAnswer = async (id) => {
  const response = await apiClient.get(`/answer/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateAnswers = async (id,values) => {
  const response = await apiClient.patch(
    `/answer/update/${id}`,
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

export const deleteAnswers = async (id) => {
  const response = await apiClient.delete(`/answer/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


//----------------------------------------------------------

export const getList_by_question = async () => {
    const response = await apiClient.get("/answer/list-by-question?count=100", {
      headers: auth_header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };


