import { useQuery } from "react-query";
import apiClient from "../apiClient";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};
const auth_header_files = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

export const getBenefit= async () => {
  const response = await apiClient.get("/context?count=100", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};


export const createSystemBenefit = async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `systemBenefit/store`,
    {
      title:values?.title,
      is_active:values?.is_active,
    },
  );
  if (!response.status) {
    return null;
  }
  return response?.data;
};

// export const showSystemBenefitContext = async (id) => {
//   const response = await apiClient.get(`systemBenefit/show/${id}`, {
//     headers: header,
//   });
//   if (!response.status) {
//     return null;
//   }
//   return response?.data;
// };

export const updateSystemBenefit= async (values, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `systemBenefit/update/${id}`,
    {
      title:values?.title,
      is_active:values?.is_active,
    },
  );
  if (!response.status) {
    return null;
  }
  return response?.data;
};

export const deleteSystemBenefit= async (id,userToken) => {
  header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`systemBenefit/delete/${id}`, {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};

// -------------------------------------------------------------------

// export const getSystemBenefitList = async () => {
//   const response = await apiClient.get("context?count=999", {
//     headers: header,
//   });
//   if (!response.status) {
//     return null;
//   }
//   return response?.data;
// };
