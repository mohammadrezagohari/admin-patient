import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getAddress = async () => {
  const response = await apiClient.get("/address/get-address", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};