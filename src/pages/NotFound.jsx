import { Link } from "react-router-dom";
import IUBLogo from "/IUBLogo.jpeg";

export default function NotFound(){
    return(
        <div className="NotFound-container">
            <img src={IUBLogo} alt="IUB-logo" />
            <div className="title">
                <h1>Esta página no existe</h1>
            </div>
                <div className="link-notFound">
                    <h3>
                        Regresa a la página principal<Link to='/'> Home </Link>
                    </h3>
                </div>
        </div>
    )
}