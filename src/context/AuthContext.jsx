import {createContext,useContext,useState} from 'react';
const Ctx=createContext();
export const useAuth=()=>useContext(Ctx);
export function AuthProvider({children}){
  const [user,setUser]=useState(()=>{const t=localStorage.getItem('token');return t?{name:localStorage.getItem('name')}:null;});
  const login=d=>{localStorage.setItem('token',d.token);localStorage.setItem('name',d.name);setUser({name:d.name});};
  const logout=()=>{localStorage.clear();setUser(null);};
  return <Ctx.Provider value={{user,login,logout}}>{children}</Ctx.Provider>;}
