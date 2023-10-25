import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
// Section
export const getSection = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get("/section?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const listSectionByUnit = async (unit_id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/section/list`,
    {
      unit_id: unit_id,
      count: 1000,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    throw new Error(`Failed to get: ${response.status}`);
  }
  return response?.data;
};
export const createSection = async (title, unit_id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.post(
    `/section/store`,
    {
      unit_id: unit_id,
      title: title,
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

export const showSections = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/section/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateSection = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.patch(
    `/section/update/${id}`,
    {
      unit_id: values.unit_id,
      title: values.title,
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

export const deleteSection = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/section/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
