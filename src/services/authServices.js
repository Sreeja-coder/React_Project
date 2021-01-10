import http from './httpServices';
// import {url} from '../config.json';
import jwtDecode from 'jwt-decode';

const apiurl ="auth";
http.setJwt(getJwt())

export async function loginAuth(userInfo){
    const{data:jwt} =  await http.post(apiurl,{
        email:userInfo.username,
        password:userInfo.password
    })
    localStorage.setItem("token",jwt);
}

export function logout() {
    localStorage.removeItem('token');
}

export function getCurrentUser(){
    try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    console.log("App",user)
    return user;
    //this.setState({user})     
  
      } 
      catch (error) {
          return null;
        console.log("App error")
      }
}

export function loginWithJwt(jwt){
    localStorage.setItem("token",jwt)
}

export function getJwt(){
    return localStorage.getItem("token");
}