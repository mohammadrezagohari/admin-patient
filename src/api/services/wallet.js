import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getWallet = async () => {
  const response = await apiClient.get("/wallet?count=1000", {
    headers: auth_header,
  }); 
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const createWallet = async (amount, bonus) => {
  const response = await apiClient.post(
    `/wallet/store`,
    {
      amount: amount,
      bonus: bonus,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
 
export const showWallets = async (id) => {
  const response = await apiClient.get(`/wallet/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const updateWallet = async (id, values) => {
  const response = await apiClient.patch(
    `/wallet/update/${id}`,
    {
      amount: values.amount,
      bonus: values.bonus
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteWallet = async (id) => {
  const response = await apiClient.delete(`/wallet/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

// ---------------------------------------------

// export const getWalletBalance = async () => {
//   const response = await apiClient.get("/wallet/balance", {
//     headers: auth_header,
//   });
//   console.log("status", response);
//   if (response.status !== 200) {
//     return null;
//   }
//   return response?.data;
// };

// export const walletIncreasePre_paid = async (amount, bonus) => {
//   const response = await apiClient.post(
//     `/wallet/increase/pre-paid`,
//     {
//       amount: amount,
//       bonus: bonus,
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

// export const walletIncreaseAmount = async (amount, bonus) => {
//   const response = await apiClient.post(
//     `/wallet/increase/amount`,
//     {
//       amount: amount,
//       bonus: bonus,
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

// export const walletDecreaseAmount = async (amount, bonus) => {
//   const response = await apiClient.post(
//     `/wallet/decrease/amount`,
//     {
//       amount: amount,
//       bonus: bonus,
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

// export const walletIncreaseBonus = async (amount, bonus) => {
//   const response = await apiClient.post(
//     `/wallet/increase/bonus`,
//     {
//       amount: amount,
//       bonus: bonus,
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

// export const walletDecreaseBonus = async (amount, bonus) => {
//   const response = await apiClient.post(
//     `/wallet/decrease/bonus`,
//     {
//       amount: amount,
//       bonus: bonus,
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


// export const walletPreview_invoice = async (question_quantity) => {
//     const response = await apiClient.post(
//       `/wallet/preview_invoice`,
//       {
//         question_quantity: question_quantity,
//       },
//       {
//         headers: auth_header,
//       }
//     );
//     console.log("status", response);
//     if (response.status !== 200) {
//       return null;
//     }
//     return response?.data;
//   };

//   export const getWalletHistories = async () => {
//     const response = await apiClient.get("/wallet/histories", {
//       headers: auth_header,
//     });
//     console.log("status", response);
//     if (response.status !== 200) {
//       return null;
//     }
//     return response?.data;
//   };
  

