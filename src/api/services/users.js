import { QueryClient, useQuery, useQueryClient } from "react-query";
import apiClient from "../apiClient";
import { _apiClient } from "../baseApi";
import { userRegister } from "./auth-api";
import baseUrl from "@/configs/base-url";
const auth_header = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  "Access-Control-Request-Method": "POST",
  "Access-Control-Request-Headers": "Content-Type, Accept",
};
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const fetchUsers = async (userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/user`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
};

