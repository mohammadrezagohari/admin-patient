import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

  
  export const getFaq = async () => {
    const response = await apiClient.get("/faq?count=100", {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const createFaq = async (values, userToken) => {
    const response = await apiClient.post(
      `faq/store`,
      {
        question: values.question,
        description:values.description,
      },
      {
        headers: auth_header,
      }
    );
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const showFaq = async (id) => {
    const response = await apiClient.get(`faq/show/${id}`, {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const updateFaq = async (id, values, userToken) => {
    const response = await apiClient.patch(
      `faq/update/${id}`,
      {
        question: values.question,
        description:values.description,
      },
      {
        headers: auth_header,
      }
    );
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const deleteFaq = async (id,userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`faq/delete/${id}`, {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };


  