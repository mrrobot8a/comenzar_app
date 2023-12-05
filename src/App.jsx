import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Navbar } from "./components/layouts/Navbar"
import { Login } from "./components/Login"
import { Home } from "./view/Home"
import { useEffect, useState } from "react"
import { ClienteView } from "./view/cliente/ClienteView"
import { CampañaView } from "./view/campaña/campañaView"
import { FacturaView } from "./view/factura/FacturaView"
import { RedimirFacturaView } from "./view/redmirFactura/RedimirFacturaView"
import { ConsultarTickets } from "./view/ticket/ConsultarTickets"
import { ProfesionView } from "./view/profesiones/ProfesionView"
import { TiendaView } from "./view/tienda/TiendaView"
import { ConsultarTiendas } from "./view/tienda/ConsultarTiendas"
import { ConsultarCampañas } from "./view/campaña/ConsultarCampañas"
import { ConsultarProfesiones } from "./view/profesiones/consultarProfesiones"

import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes"
import { TicketsAsignados } from "./view/ticket/TicketsAsignados"
import { TiendaEstadistica } from "./view/tienda/TiendaEstadistica"
import { LoginView } from "./view/login/LoginView"
import { ConsultarClientes } from "./view/cliente/ConsultarCiientes"

export const App = () => {

  const [userAuth, setUserAuth] = useState(null);
  useEffect(() => {

    const user = localStorage.getItem("user");
    if (user) setUserAuth(JSON.parse(user))

  }, []);

  console.log(userAuth)

  return (


    <BrowserRouter>
    
       {userAuth && <Navbar />}
       
      <Routes>
        <Route path="/" element={<Login user={userAuth} setUserAuth={setUserAuth} isAllowed={!!userAuth} redirect="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/clientes" element={<ClienteView />}></Route>
        <Route path="/campañas" element={<CampañaView />}></Route>
        <Route path="/consultar-campañas" element={<ConsultarCampañas/>}></Route>
        <Route path="/facturas" element={<FacturaView />}></Route>
        <Route path="/redimir-facturas" element={<RedimirFacturaView />}></Route>
        <Route path="/estado-cliente" element={<TicketsAsignados />}></Route>
        <Route path="/consultar-ticket" element={<ConsultarTickets />}></Route>
        <Route path="/tiendas" element={<TiendaView />}></Route>
        <Route path="/tienda-estadistica" element={< TiendaEstadistica />}></Route>
        <Route path="/consultar-tiendas" element={< ConsultarTiendas/>}></Route>
        <Route path="/profesiones" element={<ProfesionView />}></Route>
        <Route path="/consultar-profesiones" element={<ConsultarProfesiones />}></Route>
        <Route path="/*">"404 Not Found"</Route>
      </Routes>
    </BrowserRouter>


  )
}