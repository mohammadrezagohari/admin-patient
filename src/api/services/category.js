

export const getCategorysList = async () => {
  const response = await apiClient.get("category?count=999", {
    headers: header,
  });
  if (!response.status) {
    return null;
  }
  return response?.data;
};



import { useQuery } from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");


export const getCategory = async (userToken)=>{
myHeaders.append("Authorization", `Bearer ${userToken}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let mainResult = null;
await fetch(`${baseUrl}/api/category`, requestOptions)
.then(response => response.text())
.then(result => {
  mainResult = result;
  console.log("category", result);
})
.catch((error) => console.log("error", error));
return JSON.parse(mainResult);

}



export const showCategory = async (id,userToken)=>{
myHeaders.append("Authorization", `Bearer ${userToken}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let mainResult = null;
await fetch(`${baseUrl}/api/category/show/${id}`, requestOptions)
.then(response => response.text())
.then(result => {
  mainResult = result;
  console.log("video", result);
})
.catch((error) => console.log("error", error));
return JSON.parse(mainResult);

}


export const createCategory = async (values,userToken) => {
myHeaders.append("Authorization", `Bearer ${userToken}`);
  var raw = JSON.stringify({
    name: values.name,
    icon: values.icon,
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/category/store`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      mainResult = result;
      console.log("create category", result);
    })
    .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
};



export const updateCategory = async (id,values,userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
    var raw = JSON.stringify({
      name: values.name,
      icon: values.icon,
    })
    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/category/update/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("update category", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };


  export const deleteCategory = async (id,userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
      let mainResult = null;
      await fetch(`${baseUrl}/api/category/delete/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          mainResult = result;
          console.log("delete category", result);
        })
        .catch((error) => console.log("error", error));
      return JSON.parse(mainResult);
    };

