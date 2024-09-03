import { createContext, useEffect, useState } from "react";
import { fakeAuthProvider, getUserAndToken, getUserByToken } from "../clients/auth.client";
import toast from "react-hot-toast";


export const AuthContext = createContext(null)
export default function AuthProvider({ children }) {

    let [user, setUser] = useState(null);
    let [token, setToken] = useState(null);

    useEffect(async () => {
      try{
        const savedToken = await localStorage.getItem("access_token");
        if(!!savedToken){
          const user = await getUserByToken(savedToken);
          setToken(savedToken)
          setUser(user)
        }
      }catch(e){
        toast.error(e.message)
      }
    },[])


    let signin = async (email, password) => {
      try{
        const data = await getUserAndToken(email,password);
        setToken(data.access_token);
        localStorage.setItem("access_token", data.access_token)
        setUser(data.user);
        toast.success(`${data?.user?.name} Logged In Successfully`)
        return data.user;
      }catch(e){
        toast.error(e.message)
      }
    };
  
    let signout = async () => {
        setUser(null);
        setToken(null)
        localStorage.removeItem("access_token")
    };
  
    let value = { user, signin, signout, token };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }