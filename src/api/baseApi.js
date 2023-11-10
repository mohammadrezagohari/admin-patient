import baseUrl from "@/configs/base-url";
import React from "react";

export function _apiClient(
  endpoint,
  method = "GET",
  data = null,
  token = null
) {
  try {
    const url = `${baseUrl}/api/${endpoint}`;
    let headers = token
      ? {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        }
      : {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

    const options = {
      method: method,
      mode: "cors", // no-cors, *cors, same-origin
      headers: headers,
      redirect: "follow", // manual, *follow, error
    };

    if (data) {
      if (method.toLowerCase() == "get") {
        const query = Object.keys(data)
          .map((key) => `${key}=${encodeURIComponent(data[key])}`)
          .join("&");
        // url = `${url}?${query}`;
        console.log("uuu", `${url}?${query}`);
      } else {
        options.body = JSON.stringify(data);
      }
    }
    console.log("url", url);
    return fetch(url, options).then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
