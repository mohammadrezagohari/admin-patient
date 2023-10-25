import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getContact = async () => {
  const response = await apiClient.get("/contact?count=100", {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

 
export const createContact = async (instagram,mobile,email,address) => {
  const response = await apiClient.post(
    `/contact/store`,
    {
        instagram: instagram,
        mobile: mobile,
        email:email,
        address:address
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

// export const showContacts = async (id) => {
//   const response = await apiClient.get(`/contact/show/${id}`, {
//     headers: auth_header,
//   });
//   console.log("status", response);
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };
 
// export const updateContact = async (id,values) => {
//   const response = await apiClient.patch(
//     `/contact/update/${id}`,
//     {

//         instagram: values.instagram,
//         mobile: values.mobile,
//         email:values.email,
//         address:values.address
//     },
//     {
//       headers: auth_header,
//     }
//   );
//   console.log("status", response);
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };

// export const deleteContact = async (id) => {
//   const response = await apiClient.delete(`/contact/delete/${id}`, {
//     headers: auth_header,
//   });
//   console.log("status", response);
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };
