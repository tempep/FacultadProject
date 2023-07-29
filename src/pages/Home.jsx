import "../scss/layout/_home.scss";

export default function Home() {
  return (
    <main className="wrapper_home">
      <div className="title_container">
        <h1 className="title">
          Bienvenidos a Facultad Project
        </h1>
      </div>
      <div className="btn_container">
        <button
          className="btn_login"
          onClick={() => (window.location.href = "/login")}
        >
          Iniciar sesión
        </button>
        <button
          className="btn_new_account"
          onClick={() => (window.location.href = "/crear-cuenta")}
        >
          Crear cuenta
        </button>
      </div>
    </main>
  );
}
