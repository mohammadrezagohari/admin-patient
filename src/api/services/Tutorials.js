import { useQuery } from "react-query";
import apiClient from "../apiClient";


const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("_token_admin")}`,
  };


  export const getTutorials = async (name) => {
    const response = await apiClient.get("/Tutorials?count=100", {
      headers: header,
      name:name,
    });
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
  export const showTutorials = async (id, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
  
    const response = await apiClient.get(`/Tutorials/show/${id}`, {
      headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };


  export const createTutorials = async (context,title,category_id,main_title,first_title,first_context,second_title,second_context,image) => {
    const response = await apiClient.post(
      `/Tutorials/create`, 
      {
        context: context,
        title: title,
        category_id : category_id,
        main_title:main_title,
        first_title:first_title,
        first_context:first_context,
        second_title:second_title,
        second_context:second_context,
        image:image,
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

export const updateTutorials = async (values,id) => {

    // auth_header_files.Authorization = `Bearer ${userToken}`;

    const response = await apiClient.patch(
      `/Tutorials/update/${id}`,
  
      {
        headers: header,
      },
      {
        context: values?.context,
        category_id: values?.category_id,
        category_id : values?.category_id,
        main_title:values?.main_title,
        first_title:values?.first_title,
        first_context:values?.first_context,
        second_title:values?.second_title,
        second_context:values?.second_context,
        image:values?.image,
      }
    );
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
  export const deleteTutorilas = async (id) => {
    // auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`/Tutorials/delete/${id}`, {
      headers: header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  

