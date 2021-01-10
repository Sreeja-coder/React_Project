import http from './httpServices';
// import {url} from '../config.json';

// const apiurl =url+"users";
const apiurl ="users";

export function register(userInfo){
    return http.post(apiurl,{
        email:userInfo.username,
        password:userInfo.password,
        name:userInfo.name
    });

}