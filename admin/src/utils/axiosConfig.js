const getTokenFormLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFormLocalStorage !== null ? getTokenFormLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

console.log(config);
