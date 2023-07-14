import { Navigate } from "react-router-dom";
import {toast} from "react-hot-toast";
const URL_BACKEND_ALL_USERS = "http://localhost:5000/usuario/users";


const token = window.localStorage.getItem("token");

const getAllUsers = async () => {
    let data;
  const response=await fetch(URL_BACKEND_ALL_USERS, {headers:{Authorization:`Bearer ${token}`}});
  if(response.status === 401){
    toast.error("Su sesión ha expirado, por favor iniciar sesión nuevamente.",{duration:4000});
    console.log(response);
    setTimeout(() => {
      window.location.href="/my/logout";
    }, 5000);
  }else{
    data=await response.json();
  }
  return data;
}

export const editUserLoader = () => {
    const allUser = getAllUsers();
    return allUser;
}