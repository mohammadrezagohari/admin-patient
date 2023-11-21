 import baseUrl from "@/configs/base-url";
  
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");


export const getBenefit = async (userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/benefit`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("benefffjjjjjjjjjj", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}



export const showBenefit = async (id,userToken)=>{
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let mainResult = null;
  await fetch(`${baseUrl}/api/benefit/show/${id}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    mainResult = result;
    console.log("benefit", result);
  })
  .catch((error) => console.log("error", error));
  return JSON.parse(mainResult);

}



export const createBenefit = async (values,userToken) => {
  myHeaders.append("Authorization", `Bearer ${userToken}`);
    const raw = JSON.stringify({
      title: values.title,
      is_active: values.is_active,
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let mainResult = null;
    await fetch(`${baseUrl}/api/benefit/store`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        mainResult = result;
        console.log("create benefit", result);
      })
      .catch((error) => console.log("error", error));
    return JSON.parse(mainResult);
  };



  export const updateBenefit = async (id,values,userToken) => {
    myHeaders.append("Authorization", `Bearer ${userToken}`);
      var raw = JSON.stringify({
        title: values.title,
        is_active: values.is_active,
      })
      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let mainResult = null;
      await fetch(`${baseUrl}/api/benefit/update/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          mainResult = result;
          console.log("update benefit", result);
        })
        .catch((error) => console.log("error", error));
      return JSON.parse(mainResult);
    };
  

    export const deleteBenefit = async (id,userToken) => {
      myHeaders.append("Authorization", `Bearer ${userToken}`);
        const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        let mainResult = null;
        await fetch(`${baseUrl}/api/benefit/delete/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            mainResult = result;
            console.log("delete benefit", result);
          })
          .catch((error) => console.log("error", error));
        return JSON.parse(mainResult);
      };
  

