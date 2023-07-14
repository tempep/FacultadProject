import React from "react";
export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(window.localStorage.getItem("token") ?? false);

  const login = React.useCallback(() => {
    setIsAuthenticated(true);
    }, []);

    const logout = React.useCallback(() => {
        window.localStorage.clear();
        setIsAuthenticated(false);
    }, []);

    const value=React.useMemo( () => ({
        login,
        logout,
        isAuthenticated
    }), [login, logout, isAuthenticated]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext(){
    return React.useContext(AuthContext);
}