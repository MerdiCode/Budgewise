import axios from "axios";
import { createContext,useEffect, useState } from "react";

export const UsersAuth = createContext();

const AuthProvider =  ({children})=>{
const [user ,setUser] = useState(null);
useEffect(()=>{
    const FetchUser =async ()=>{
        try {
            const result = await axios.get('http://localhost:4001/users/auth/me',{withCredentials:true})
            setUser(result.data)
          } catch (error) {
              console.error(error)
          }
    }
   FetchUser()
    
},[])
console.log(user)
return(<UsersAuth.Provider value={{user}}>
{children}
</UsersAuth.Provider>)

}
export default AuthProvider;