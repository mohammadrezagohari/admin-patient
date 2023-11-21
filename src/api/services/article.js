import { useQuery } from "react-query";
import apiClient from "../apiClient";
import baseUrl from "@/configs/base-url";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export const getArticle = async (userToken)=>{
myHeaders.append("Authorization", `Bearer ${userToken}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let mainResult = null;
await fetch(`${baseUrl}/api/article`, requestOptions)
.then(response => response.text())
.then(result => {
  mainResult = result;
  console.log("article", result);
})
.catch((error) => console.log("error", error));
return JSON.parse(mainResult);
}




export const showArticle = async (id,userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/article/show/${id}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("article", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);
}

export const createArticle = async (values,userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
    const raw = JSON.stringify({
      title: values.title,
      context:values.context,
      category_id: values.category_id,
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/article/store`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("create article", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };

  export const updateArticle = async (id,values,userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
      var raw = JSON.stringify({
        title: values.title,
        context:values.context,
        category_id: values.category_id,
      })
      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let mainResult = null;
      await fetch(`${baseUrl}/api/article/update/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          mainResult = result;
          console.log("update article", result);
        })
        .catch((error) => console.log("error", error));
      return JSON.parse(mainResult);
    };


    export const deleteArticle= async (id,userToken) => {
      myHeaders.append("Authorization", `Bearer ${userToken}`);
        const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        let mainResult = null;
        await fetch(`${baseUrl}/api/article/delete/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            mainResult = result;
            console.log("delete article", result);
          })
          .catch((error) => console.log("error", error));
        return JSON.parse(mainResult);
      };