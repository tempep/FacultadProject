const URL_BACKEND_CARRERAS = "http://127.0.0.1:5000/carrera/get_carreras";


const getCarreras =  async () => {
  const response=await fetch(URL_BACKEND_CARRERAS);
  const data = await response.json();
  return data;
}

export const crearCuentaLoader = async () => {
    const carreras = await getCarreras();
    return carreras;
}