import { useQuery } from "react-query";
import apiClient from "../apiClient";


const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("_token_admin")}`,
  };


  export const getArticle = async () => {
    const response = await apiClient.get("/article?count=100", {
      headers: header,
    });
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
  export const showArticle = async (id, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
  
    const response = await apiClient.get(`/course/show/${id}`, {
      headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };


  export const createArticle = async (context,title,category_id) => {
    const response = await apiClient.post(
      `/article/store`, 
      {
        context: context,
        title: title,
        category_id : category_id
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

export const updateArticle = async (values,id) => {

    // auth_header_files.Authorization = `Bearer ${userToken}`;

    const response = await apiClient.patch(
      `/article/update/${id}`,
  
      {
        headers: header,
      },
      {
        title: values?.title,
        context: values?.context,
        category_id: values?.category_id,
      }
    );
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
  export const deleteArticle = async (id) => {
    // auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`/article/delete/${id}`, {
      headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  

