
const URL_BACKEND_USER_INFORMATION = "http://127.0.0.1:5000/usuario/user_information";

export default async function getUserInformation(token) {
    window.localStorage.setItem("token", token);
    const response = await fetch(URL_BACKEND_USER_INFORMATION, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    window.localStorage.setItem("userInfo", JSON.stringify(data.datos));
}