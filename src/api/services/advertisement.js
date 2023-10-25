import { useQuery } from "react-query";
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
export const getAdvertisement = async () => {
  const response = await apiClient.get("/ads?count=1000", {
    headers: auth_header,
  }); 
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

 
export const createAdvertisement = async (title,link,video_link,paid_status,expire_at) => {
  const response = await apiClient.post(
    `/ads/store`,
    {
        title: title,
        link: link,
        video_link: video_link,
        paid_status: paid_status,
        expire_at: expire_at,
    },
    {
      headers: auth_header_files,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showAdvertisements = async (id) => {
  const response = await apiClient.get(`/grade/show/${id}`, {
    headers: auth_header_files,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
 
// export const updateAdvertisement = async (id,values) => {
//   const response = await apiClient.patch(
//     `/grade/update/${id}`,
//     {
//         name: values.name,
//         priority:values.priority
//     },
//     {
//       headers: auth_header,
//     }
//   );
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };

export const deleteAdvertisement = async (id) => {
  const response = await apiClient.delete(`/ads/delete/${id}`, {
    headers: auth_header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};