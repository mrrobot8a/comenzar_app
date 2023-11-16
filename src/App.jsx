import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { useEffect, useState } from "react"
import { Clientes } from "./components/Clientes"

export const App = () => {  

   const [userAuth, setUserAuth] = useState(null);

   useEffect(() => {

      const user = localStorage.getItem("user");
      if(user) setUserAuth(JSON.parse(user))

   }, []);

  return (
    <div className="container">
      {
         !!userAuth && <Navbar/>
      }

      <Routes>
        <Route path="/login" element={<Login setUserAuth={setUserAuth} isAllowed={!!userAuth} redirect="/clientes"/>}></Route>
        <Route path="/clientes" element={<Clientes />}></Route>
      </Routes>

    </div>
  )
}
