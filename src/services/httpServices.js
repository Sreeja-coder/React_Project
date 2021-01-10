import axios from 'axios';
import {toast} from 'react-toastify';
import logService from './logService';

console.log(process.env.REACT_APP_API_URL)
console.log("hiii")
axios.defaults.baseURL="https://lit-river-71701.herokuapp.com/api";
//this makes sure when there is authentication token being sent in the header but this causes a bi-directional dependencies as http needs authservices and vice-versa
// axios.defaults.headers.common["x-auth-token"] =getJwt();
axios.interceptors.response.use(null,error => {
    const condition = error.response && error.response.status >= 400 && error.response.status < 500;     
    if(!condition){

      toast.error("it is an unexpected error");
     logService.log(error);
      //console.log("Unexpected error ",error);
    }  
    return Promise.reject(error);
  });

  export function setJwt(jwt){
    console.log(jwt);
    axios.defaults.headers.common["x-auth-token"] = jwt;
  }

  export default {
      get:axios.get,
      put:axios.put,
    //   push:axios.push,
      delete:axios.delete,
      post:axios.post,
      setJwt

  };