import { _apiClient } from "../baseApi";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

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

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

// export const getTutorials = async (page, userToken = null) => {
export const getTutorials = async (count = 10, userToken = null) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.get(`/tutorial?count=${count}`, {
    headers: header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showTutorials = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;

  const response = await apiClient.get(`/tutorial/show/${id}`, {
    headers: header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createTutorials = (values, userToken) => {
//   myHeaders.append("Authorization", `Bearer ${userToken}`);

//   var data = new FormData();
//   data.append(main_title, values.main_title);
//   data.append(first_title, values.first_title);
//   data.append(first_context, values.first_context);
//   data.append(second_title, values.second_title);
//   data.append(second_context, values.second_context);
//   data.append(main_image, values.main_image);
//   data.append(category_id, values.category_id);

//   var requestOptions = {
//     method: "post",
//     headers: myHeaders,
//     redirect: "follow",
//     body: data,
//   };
//   let mainResult = null;
//   fetch(`${baseUrl}/api/tutorial/store`, requestOptions)
//     .then((response) => response.text())
//     .then((result) => {
//       mainResult = result;
//     })
//     .catch((error) => console.log("error", error));
//   return JSON.parse(mainResult);

//   const data = {
//       main_title: values.main_title,
//       first_title: values.first_title,
//       first_context: values.first_context,
//       second_title: values.second_title,
//       second_context: values.second_context,
//       main_image: values.main_image,
//       category_id: values.category_id,
//   };
//   console.log('data',data);
//   return  _apiClient("tutorial/store", "post", userToken,data);

    auth_header_files.Authorization = `Bearer ${userToken}`;
    const response = apiClient
      .post(
        `/tutorial/store`,
        {
          main_title: values.main_title,
          first_title: values.first_title,
          first_context: values.first_context,
          second_title: values.second_title,
          second_context: values.second_context,
          main_image: values.main_image,
          category_id: values.category_id,
        },
        {
          headers: auth_header_files,
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          return null;
        }
        return response;
      });
    return response;
};


export const createTutorialsStep01 = (values, userToken) => {
        auth_header_files.Authorization = `Bearer ${userToken}`;
        const response = apiClient
          .post(
            `/tutorial/store_step01`,
            {
              main_title: values.main_title,
              first_title: values.first_title,
              first_context: values.first_context,
              main_image: values.main_image,
              category_id: values.category_id,
            },
            {
              headers: auth_header_files,
            }
          )
          .then((response) => {
            if (response.status !== 200) {
              return null;
            }
            return response;
          });
        return response;
    };

export const createTutorialsStep02 = (values, userToken) => {
        auth_header_files.Authorization = `Bearer ${userToken}`;
        const response = apiClient
          .post(
            `/tutorial/store_step02`,
            {
              id: values.id,
              second_title: values.second_title,
              second_context: values.second_context,
            },
            {
              headers: auth_header_files,
            }
          )
          .then((response) => {
            if (response.status !== 200) {
              return null;
            }
            return response;
          });
        return response;
    };

// ----------------------------------------------------------------------------

export const updateTutorials = async (values, id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.patch(
    `/tutorial/update/${id}`,

    {
      headers: header,
    },
    {
      context: values?.context,
      category_id: values?.category_id,
      category_id: values?.category_id,
      main_title: values?.main_title,
      first_title: values?.first_title,
      first_context: values?.first_context,
      second_title: values?.second_title,
      second_context: values?.second_context,
      image: values?.image,
    }
  );
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteTutorilas = async (id, userToken) => {
  auth_header_files.Authorization = `Bearer ${userToken}`;
  const response = await apiClient.delete(`/tutorial/delete/${id}`, {
    headers: header,
  });
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
