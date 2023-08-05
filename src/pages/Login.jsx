import React from "react";
import "../scss/layout/_login.scss";
import logo_unibq from "../../public/IUBLogo.jpeg";
import { PersonVcard } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import getUserInformation from "../components/GetUserInformation";
import { useAuthContext } from "../contexts/AuthContext";


const URL_BACKEND_LOGIN = "http://127.0.0.1:5000/auth/login";

export default function Login() {
  const {login} = useAuthContext();
  const [dataLogin, setDataLogin] = React.useState({
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setDataLogin((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
      const toastId = toast.loading("Iniciando sesión...");
      const response = await fetch(URL_BACKEND_LOGIN, {
        method: "POST",
        body: JSON.stringify(dataLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status_code == 201 || data.status_code == 200) {
        toast.success("Credenciales validas!", {
          id: toastId,
          duration: 3000,
        });
        await getUserInformation(data.token);
        login();
        console.log("Hola login")
      }
      toast.dismiss();
  }

  return (
    <main className="wrapper_login">
      <img src={logo_unibq} alt="Logo UniBarranquilla" className="logo_unibq" />
      <form className="form_login" onSubmit={handleSubmit}>
        <div className="form_login header">
          <h2>Inicio de sesión</h2>
          <PersonVcard size={90} color="white" />
        </div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="usuario@unibarranquilla.edu.co"
            autoComplete="off"
            onChange={handleInputChange}
            required
          />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••••"
          autoComplete="off"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
