// import baseUrl from "@/configs/base-url";
// import apiClient from "../apiClient";

// const auth_header0 = {
//   "Content-Type": "multipart/form-data",
//   "Accept": "application/json",
//   // "Access-Control-Allow-Origin": "*",
//   // "Access-Control-Allow-Credentials":"true",
//   "Access-Control-Request-Method": "POST",
//   "Access-Control-Request-Headers": "Content-Type, Accept,Authorization,API-key",
// };

// const auth_header = {
//   "Content-Type": "multipart/form-data",
//   "Accept": "application/json",
//   "Access-Control-Request-Method": "POST",
//   "Access-Control-Request-Headers": "Content-Type, Accept",
// };
  
//   export const getGoal = async () => {
//     const response = await apiClient.get("/goal?count=100", {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data; 
//   };
  
//   export const createGoal = async (values, userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.post(
//       `goal/store`,
//       {
//         title: values?.title,
//         description: values?.description,
//       },
//       {
//         headers: auth_header,
//       }
//     )
//     .then((response) => {
//       if (response.status !== 200) {
//         return null;
//       }
//       return response;
//     });
//   return response;
// };
  
//   export const showGoal = async (id,userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.get(`goal/show/${id}`, {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };
  
//   export const updateGoal= async (id, values, userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.patch(
//       `goal/update/${id}`,
//       {
//         title: values?.title,
//         description: values?.description,
//       },
//       {
//         headers: auth_header,
//       }
//     );
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };
  
//   export const deleteGoal = async (id,userToken) => {
//     auth_header.Authorization = `Bearer ${userToken}`;
//     const response = await apiClient.delete(`goal/delete/${id}`, {
//       headers: auth_header,
//     });
//     if (!response.status) {
//       return null;
//     }
//     return response?.data;
//   };
  
  // -------------------------------------------------------------------
  import { useQuery } from "react-query";
  import apiClient from "../apiClient";
  import baseUrl from "@/configs/base-url";
  
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");


export const getGoal = async (userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/goal`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("goal", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}



export const showGoal = async (id,userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/goal/show/${id}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("goal", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}



export const createGoal = async (values,userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
    var raw = JSON.stringify({
      title: values.title,
      description: values.description,
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/goal/store`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("create goal", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };



  export const updateGoal = async (id,userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
      var raw = JSON.stringify({
        title: title,
        description: description,
      })
      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let mainResult = null;
      await fetch(`${baseUrl}/api/goal/update/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          mainResult = result;
          console.log("update goal", result);
        })
        .catch((error) => console.log("error", error));
      return JSON.parse(mainResult);
    };
  

    export const deleteGoal = async (id,userToken) => {
      myHeaders.append("Authorization", `Bearer ${userToken}`);
        const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        let mainResult = null;
        await fetch(`${baseUrl}/api/goal/delete/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            mainResult = result;
            console.log("delete goal", result);
          })
          .catch((error) => console.log("error", error));
        return JSON.parse(mainResult);
      };
  

