import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

// Retrieve token from localStorage, handling potential errors
// const getTokenFromLocalStorage = () => {
//   try {
//     const userItem = localStorage.getItem("user");
//     if (userItem) {
//       return JSON.parse(userItem).token;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error retrieving token from localStorage:", error);
//     return null; // Or handle it differently (throw error, display message)
//   }
// };

// const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Dynamically fetch token
//     Accept: "application/json",
//   },
// };

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Fetches all orders for the user
const getOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/getallorders`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

// Fetches a specific order based on its ID
const getOrder = async (id) => {
  try {
    const response = await axios.post(
      `${base_url}user/getorderbyuser/${id}`,
      "",
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    // Handle the error here
  }
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
