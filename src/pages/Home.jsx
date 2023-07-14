import { Link } from "react-router-dom";
import Logo from "/IUBLogo.jpeg";

export default function Home() {
  return (
    <main className="h-screen bg-dark-blue grid grid-cols-1 md:grid-cols-2 md:items-center">
      <figure className="flex justify-center">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo IUB" />
        </div>
      </figure>
      <section className="flex flex-col items-center gap-y-4">
        <h1 className="md:text-2xl text-white text-center">
          Bienvenido a <span className="text-white">Facultad</span>
          <span className="text-yellow-300">Project</span>
        </h1>
        <section className="flex gap-x-2">
          <button className="bg-yellow-300 hover:bg-black text-white font-bold py-4 md:w-56 rounded">
            <Link to="/login">Iniciar sesión</Link>
          </button>
          <button className="bg-white hover:bg-gray-200 text-black py-4 md:w-56 rounded" onClick={() => window.location.href="/crear-cuenta"}>
            Crear cuenta
          </button>
        </section>
      </section>
    </main>
  );
}
