import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/layouts/Navbar"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { useEffect, useState } from "react"
import { Clientes } from "./components/Clientes"
import { ClienteView } from "./view/cliente/ClienteView"
import { CampañaView } from "./view/campaña/campañaView"

export const App = () => {

   const [userAuth, setUserAuth] = useState(null);

   useEffect(() => {

      const user = localStorage.getItem("user");
      if(user) setUserAuth(JSON.parse(user))

   }, []);

  return (
    <div>
      
      {
        !!userAuth && <Navbar/>
      }

      <div style={{ width: '100%' }}>
        <Routes>
          <Route path="/login" element={<Login setUserAuth={setUserAuth} isAllowed={!!userAuth} redirect="/clientes"/>}></Route>
          <Route path="/clientes" element={<Clientes />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cliente" element={<ClienteView/>}></Route>
          <Route path="/campaña" element={<CampañaView/>}></Route>
        </Routes>
      </div>
    </div>
  )
}
