import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

  
  export const getGoal = async () => {
    const response = await apiClient.get("/goal?count=100", {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data; 
  };
  
  export const createGoal = async (values, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.post(
      `goal/store`,
      {
        title: values?.title,
        description: values?.description,

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
  
  export const showGoal = async (id,userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.get(`goal/show/${id}`, {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  export const updateGoal= async (id, values, userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.patch(
      `goal/update/${id}`,
      {
        title: values?.title,
        description: values?.description,
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
  
  export const deleteGoal = async (id,userToken) => {
    auth_header.Authorization = `Bearer ${userToken}`;
    const response = await apiClient.delete(`goal/delete/${id}`, {
      headers: auth_header,
    });
    if (!response.status) {
      return null;
    }
    return response?.data;
  };
  
  // -------------------------------------------------------------------

  