import "../scss/layout/_home.scss";

export default function Home() {
  return (
    <main className="wrapper_home">
      <div className="title_container">
        <h1 className="title">
          <span className="sub_title1">Bienvenidos a</span>
          <span className="sub_title2">Facultad</span>
          <span className="sub_title3">Project</span>
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
