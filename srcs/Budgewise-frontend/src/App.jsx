import LogSignIn from "./LoginSingup"
import HomePage from "./HomePage";
import {BrowserRouter as  Router,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import {UsersAuth} from "./authenication/UserAuth";





function App() {
const {user} = useContext(UsersAuth)

  return (
    <>  
   <Router>
    <Routes>
      <Route path="/" element={!user ? <LogSignIn/>:<HomePage/>}/>
     <Route path="/Register" element={!user ? <LogSignIn/>:<HomePage/>}/> 
    </Routes>
   </Router>
   
    
    </>
  )
}

export default App
