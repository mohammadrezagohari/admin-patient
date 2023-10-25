import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};
const auth_header_files = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getStorys = async () => {
  const response = await apiClient.get("/story?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createStorys = async (
    title,
    link,
    priority_order,
    expire_at,
    image_preview,
    file_url 
) => { 
  const response = await apiClient.post(
    `/story/store`,
    {
        title: title,
        link: link,
        priority_order:priority_order,
        expire_at: expire_at,
        image_preview: image_preview,
      file_url: file_url,
      },
    {
      headers: auth_header_files,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showStory = async (id) => {
  const response = await apiClient.get(`/story/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
 
export const updateStorys = async (id,values) => {
  const response = await apiClient.patch(
    `/story/update/${id}`,
   
    {
      title: values.title,
      link: link,
      priority_order:values.priority_order,
      expire_at: values.expire_at,
      image_preview: values.image_preview,
      file_url: values.file_url,
     
    },
    {
      headers: auth_header_files,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteStorys = async (id) => {
  const response = await apiClient.delete(`/story/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
