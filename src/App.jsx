import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/layouts/Navbar"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { useEffect, useState } from "react"
import { Clientes } from "./components/Clientes"
import { ClienteView } from "./view/cliente/ClienteView"
import { CampañaView } from "./view/campaña/campañaView"
import { FacturaView } from "./view/factura/FacturaView"
import { RedimirFacturaView } from "./view/redmirFactura/RedimirFacturaView"
import { ConsultarTickets } from "./view/ticket/ConsultarTickets"
import { ProfesionView } from "./view/profesiones/ProfesionView"
import { TiendaView } from "./view/Tienda/TiendaView"
import { DocumentoView } from "./view/documento/DocumentoView"
import { LoginView } from "./view/login/LoginView"


export const App = () => {

  const [userAuth, setUserAuth] = useState(null);
  useEffect(() => {

    const user = localStorage.getItem("user");
    if (user) setUserAuth(JSON.parse(user))

  }, []);

  // console.log(userAuth)

  return (
    <div>

      {
        !!userAuth && <Navbar />
      }
      
      <Routes>
        <Route path="/login" element={<Login user={userAuth} setUserAuth={setUserAuth} isAllowed={!!userAuth} redirect="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/clientes" element={<ClienteView />}></Route>
        <Route path="/campañas" element={<CampañaView />}></Route>
        <Route path="/facturas" element={<FacturaView />}></Route>
        <Route path="/redimir-facturas" element={<RedimirFacturaView />}></Route>
        <Route path="/consultar-ticket" element={<ConsultarTickets />}></Route>
        <Route path="/tiendas" element={<TiendaView />}></Route>
        <Route path="/*">"404 Not Found"</Route>

      </Routes>
    </div>

  )
}