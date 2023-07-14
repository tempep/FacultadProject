import { Navigate, Outlet } from "react-router-dom";
import { MY } from "../../config/routes/paths";
import {useAuthContext} from "../../contexts/AuthContext";

export default function PublicRoute(){
    const {isAuthenticated}=useAuthContext();

    if(isAuthenticated){
        return <Navigate to={MY} />
    }
    
    return (
        <div>
            <Outlet />
        </div>
    );
}