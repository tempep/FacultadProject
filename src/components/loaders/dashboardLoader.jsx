import { toast } from "react-hot-toast";
const URL_BACKEND_USER_INFORMATION =
  "http://127.0.0.1:5000/usuario/user_information";
const URL_BACKEND_GET_TUTORIAS_BY_DAY_DOCENTE =
  "http://127.0.0.1:5000/tutoria/count_tutorias_day_by_docente";
const URL_BACKEND_GET_TUTORIAS_BY_WEEK_DOCENTE =
  "http://127.0.0.1:5000/tutoria/count_tutorias_week_by_docente";
const URL_BACKEND_GET_TUTORIAS_BY_MONTH_DOCENTE =
  "http://127.0.0.1:5000/tutoria/count_tutorias_month_by_docente";

async function getUserInformation(token) {
  try {
    const response = await fetch(URL_BACKEND_USER_INFORMATION, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status_code === 401) {
      throw new Error(data.message);
    } else {
      window.localStorage.setItem("userInfo", JSON.stringify(data.datos));
      console.log(window.localStorage.getItem("userInfo"));
    }
  } catch (error) {
    console.error(err.message);
  }
}

async function getTutoriasByDay(token, userInfo) {
  try {
    var byDay = 0;
    const response = await fetch(
      `${URL_BACKEND_GET_TUTORIAS_BY_DAY_DOCENTE}/${userInfo.numero_identificacion}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 401 || response.status === 400) {
      window.location.href = "/my/logout";
      throw new Error(data.message);
    } else {
      const data = await response.json();
      byDay = data.count;
      return byDay;
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
}

async function getTutoriasByWeek(token, userInfo) {
  try {
    var byWeek = 0;
    const response = await fetch(
      `${URL_BACKEND_GET_TUTORIAS_BY_WEEK_DOCENTE}/${userInfo.numero_identificacion}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 401 || response.status === 400) {
      window.location.href = "/my/logout";
      throw new Error(data.message);
    } else {
      const data = await response.json();
      byWeek = data.count;
      return byWeek;
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
}

async function getTutoriasByMonth(token, userInfo) {
  try {
    var byMonth = 0;
    const response = await fetch(
      `${URL_BACKEND_GET_TUTORIAS_BY_MONTH_DOCENTE}/${userInfo.numero_identificacion}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 401 || response.status === 400) {
      window.location.href = "/my/logout";
      throw new Error(data.message);
    } else {
      const data = await response.json();
      byMonth = data.count;
      return byMonth;
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
}

export const dashboardLoader = async () => {
  const token = window.localStorage.getItem("token");
  await getUserInformation(token);
  const objStored = window.localStorage.getItem("userInfo");
  const userInfo = JSON.parse(objStored);
  const byMonth = await getTutoriasByMonth(token, userInfo);
  const byWeek = await getTutoriasByWeek(token, userInfo);
  const byDay = await getTutoriasByDay(token, userInfo);
  return {
    byDay,
    byWeek,
    byMonth,
  };
};
