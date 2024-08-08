export const apiBase = import.meta.env.VITE_API_BASE;

const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
export const userToken = user?.token;
