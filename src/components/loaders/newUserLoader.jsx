import { toast } from "react-hot-toast";
const URL_BACKEND_ASIGNATURAS = "http://127.0.0.1:5000/asignatura/get_asignaturas";
const URL_BACKEND_CARRERAS = "http://127.0.0.1:5000/carrera/get_carreras";
const token=window.localStorage.getItem("token");

const getAsignaturas = async () => {
  let data;
  const response=await fetch(URL_BACKEND_ASIGNATURAS, {headers:{Authorization:`Bearer ${token}`}});
  if(response.status === 401){
    toast.error("Su sesión ha expirado, por favor iniciar sesión nuevamente.",{duration:4000});
    window.location.href="/my/logout";
  }else{
    data=await response.json();
  }
  return data;
}

const getCarreras =  async () => {
  const response=await fetch(URL_BACKEND_CARRERAS, {headers:{Authorization:`Bearer ${token}`}});
  const data = await response.json();
  return data;
}

export const newUserLoader = async () => {
  const asignaturas=await getAsignaturas();
  const carreras=await getCarreras();
  return {
    asignaturas, carreras
  }
}