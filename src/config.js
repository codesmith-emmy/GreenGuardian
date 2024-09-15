import axios from "axios";
const baseURL = "https://mehak23.pythonanywhere.com";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  createPlant: "/api/create/",
  plantDetail: "/api/detail2/",
};
export { clientBaseURL, clientEndPoints };
