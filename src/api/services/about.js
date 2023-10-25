import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
  
export const getAbout = async () => {
  const response = await apiClient.get("/about?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const createAbout = async (content,title) => {
  const response = await apiClient.post(
    `/about/store`, 
    {
      content: content,
      title: title
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

export const updateAbout = async (id,values) => {
  const response = await apiClient.patch(
    `/about/update/${id}`,
    {
        content: values.content,
        title:values.title,
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

export const deleteAbout = async (id) => {
  const response = await apiClient.delete(`/About/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};



