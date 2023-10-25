import { QueryClient, useQuery, useQueryClient } from "react-query";
import apiClient from "../apiClient";
import { idID } from "@mui/material/locale";
import { userRegister } from "./auth-api";
const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

const queryClient = useQueryClient();

export const fetchUsers = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  // handleClearCache();
  const response = await apiClient.get("/profile/me", { headers: auth_header }); // Replace with your API endpoint

  if (response.status !== 200) {
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
