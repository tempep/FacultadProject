import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

export default function Logout(){
    const {logout}=useAuthContext();
    React.useEffect(() => {
        toast.custom((t) => (
            <div
              className={`bg-white px-6 py-4 shadow-md rounded-full ${
                t.visible ? 'animate-enter' : 'animate-leave'
              }`}
            >
              Se ha finalizado la sesión 👋
            </div>
          ));
        logout();
    }, []);
    return null;
}