import axios from "axios";
import apiClient from "@/api/apiClient";
import { useQueryClient, useQuery } from "react-query";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// export const forgetPassword = async ({mobile}) => {
//   const { data } = await axios.post(baseUrl + "/auth/otp",{
//     mobile
//   });
//   return data;
// };

export const signIn = async (mobile, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  var raw = JSON.stringify({
    "mobile": mobile,
    "password": password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const result = await fetch(
    "https://product.gandom.link/api/auth/login",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));

  return result;
  //   const { data } = await apiClient.post(
  //     "auth/login",
  //     {
  //       mobile: mobile,
  //       password: password,
  //     },
  //     {
  //       headers: auth_header,
  //     }
  //   );
  //   return data;
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
  auth_header.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get("/profile", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
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
  const response = await apiClient.get("/profile/me", { headers: auth_header }); // Replace with your API endpoint
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
      name: values?.name,
      mobile: values?.mobile,
      is_student: values?.is_student,
      field_id: values?.field_id,
      grade_id: values?.grade_id,
      school_id: values?.school_id,
      familiar_with_us: values?.familiar_with_us,
      city_id: values?.city_id,
      province_id: values?.province_id,
      sex: values?.sex,
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

  const { data } = await axios.get(baseUrl + "/profile", {
    headers: auth_header,
  });
  return data;
};
