import { QueryClient, useQuery, useQueryClient } from "react-query";
import apiClient from "../apiClient";
import { userRegister } from "./auth-api";
const auth_header = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};

export const fetchUsers = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  // handleClearCache();
  const response = await apiClient.get("/user", { headers: auth_header }); // Replace with your API endpoint
  if (!response.status) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};



// const fetchUser = async (userId) => {
//   const response = await apiClient.get("/profile/me"); // Replace with your API endpoint

//   if (response.status !== 200) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.data;
// };
