/* eslint-disable prettier/prettier */
import axios from "axios";
// the url to the root in the node server
export default () => {
  return axios.create({
    baseURL: "api",
    headers: { 'Access-Control-Allow-Headers': '*' },
  });
};