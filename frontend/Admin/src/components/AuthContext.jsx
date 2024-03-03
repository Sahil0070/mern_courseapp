import React, { useEffect, useState,createContext,useContext } from 'react'

const AuthContext = createContext();

const useAuth=()=>{
    return useContext(AuthContext);
}
export const AuthProvider=({ children })=> {
    const [authToken,setAuthToken]= useState(()=>localStorage.getItem('admin_authtoken') || null);
    const [isLoggedIn,setIsLoggedIn] = useState(!!authToken)
    const login = (token)=>{
        console.log("here",token)
        setAuthToken(token);
        localStorage.setItem('admin_authtoken',token);
        setIsLoggedIn(true);
        console.log(token);
    }  
    const logout=()=>{
        setAuthToken('null');
        localStorage.removeItem('admin_authtoken')
        setIsLoggedIn(false)
    };
    useEffect(()=>{
        const storedToken = localStorage.getItem('admin_authtoken');
        const isTokenValid = !!storedToken;
        if(!isTokenValid){
            logout();
        }

    },[isLoggedIn]);
    
    const contextValue = {
        authToken,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn,
      };
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;

}
export default useAuth