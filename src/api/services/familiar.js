import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getFamiliar = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/familiar?count=100", {
    headers: auth_header,
  });
  console.log('our response',response)
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createFamiliar = async (field, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `/familiar/store`,
    {
      name: field,
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

export const showFamiliar = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/familiar/show/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateFamiliar = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/familiar/update/${id}`,
    {
      name: values.name,
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

export const deleteFamiliar = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`/familiar/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
