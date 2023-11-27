import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/layouts/Navbar"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { useEffect, useState } from "react"
import { Clientes } from "./components/Clientes"
import { useEffect, useState } from "react"
import { ClienteView } from "./view/cliente/ClienteView"
import { CampañaView } from "./view/campaña/campañaView"
import { FacturaView } from "./view/factura/FacturaView"
import { RedimirFacturaView } from "./view/redmirFactura/RedimirFacturaView"
import { ConsultarTickets } from "./view/ticket/ConsultarTickets"
import { ProfesionView } from "./view/profesiones/ProfesionView"
import { TiendaView } from "./view/Tienda/TiendaView"
import { DocumentoView } from "./view/documento/DocumentoView"


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

     
      <Navbar/>
        <Routes>
          <Route path="/login" element={<Login setUserAuth={setUserAuth} isAllowed={!!userAuth} redirect="/cliente"/>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cliente" element={<ClienteView/>}></Route>
          <Route path="/campaña" element={<CampañaView/>}></Route>
          <Route path="/factura" element={<FacturaView/>}></Route>
          <Route path="/RedimirFactura" element={<RedimirFacturaView/>}></Route>
          <Route path="/ConstarTieckts" element={<ConsultarTickets/>}></Route>
          <Route path="/Profesion" element={<ProfesionView/>}></Route>
          <Route path="/Tienda" element={<TiendaView/>}></Route>
          <Route path="/Documento" element={<DocumentoView/>}></Route>
          <Route path="*">"404 Not Found"</Route>

        </Routes>
      </div>
    
  )
}