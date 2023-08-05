import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLocaleStorage from "../hooks/useLocaleStorage";

const RequiredAuth = ({allowedRoles}) => {
    const {userInfo}=useLocaleStorage();
    const location = useLocation();
    
    console.log(userInfo);

    

    return (
        <Outlet />
    )
}

export default RequiredAuth;