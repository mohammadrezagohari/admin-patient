import apiClient from "@/api/apiClient";
import baseUrl from "@/configs/base-url";
import { useQueryClient, useQuery } from "react-query";
// "Content-Type": "application/x-www-form-urlencoded",

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const signIn = async (mobile, password) => {
  //   var raw = JSON.stringify({
  //     mobile: mobile,
  //     password: password,
  //   });
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   let mainResult = null;
  //   await fetch(`${baseUrl}/api/auth/login`, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       mainResult = result;
  //       console.log("result", result);
  //     })
  //     .catch((error) => console.log("error", error));
  //   return JSON.parse(mainResult);

  const { data } = await apiClient.post(
    "auth/login",
    {
      mobile: mobile,
      password: password,
    },
    {
      headers: auth_header,
    }
  );
  return data;
};

export const userRegister = async (name, mobile, password) => {
  const { data } = await apiClient.post(
    "auth/register",
    {
      name: name,
      mobile: mobile,
      password: password,
    },
    {
      headers: auth_header,
    }
  );
  return data;
};

export const profile = async (userToken) => {
  //   auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/profile", {
    headers: auth_header,
  });
  console.log("response data me", response);
  if (!response.status) {
    throw new Error("Failed to fetch data");
  }
  return response?.data;
};

export const showProfile = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/profile/show/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getProfileMe = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/profile", { headers: auth_header }); // Replace with your API endpoint
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
  // return data;
};

export const createProfile = async (field, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `/field/store`,
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

export const updateProfiles = async (id, values, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `/profile/update/${id}`,
    {
      avatar: values?.avatar,
      first_name: values?.first_name,
      last_name: values?.last_name,
      mobile: values?.mobile,
      city_id: values?.city_id,
      sex: values?.sex,
      workspace_id: values?.workspace_id,
      password: values?.password,
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

export const deleteProfiles = async (id, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.delete(`/profile/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const profileProvince = async (userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;

  const { data } = await apiClient.get("/profile", {
    headers: auth_header,
  });
  return data;
};

export const logOut = async (field, userToken) => {
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.post(
    `/field/store`,
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
