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
export const getSummaryFormula = async () => {
  const response = await apiClient.get("/summary?count=100", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

 
export const createSummaryFormula = async (unit_id,user_id,image) => {
  const response = await apiClient.post(
    `/summary/store`,
    {
        unit_id: unit_id,
        user_id: user_id,
        image: image,
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

export const showSummaryFormulas = async (id) => {
  const response = await apiClient.get(`/summary/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateSummaryFormula = async (id,values) => {
  const response = await apiClient.patch(
    `/summary/update/${id}`,
    {
        unit_id: values.unit_id,
        user_id: values.user_id,
        image: values.image,
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

export const deleteSummaryFormula = async (id) => {
  const response = await apiClient.delete(`/summary/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};