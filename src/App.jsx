import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/layouts/Navbar"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { ClienteView } from "./components/cliente/ClienteView"

export const App = () => {

  return (

    <div style={{ width: '100%' }}>

      <Navbar />


      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/cliente" element={<ClienteView/>}></Route>
      </Routes>

    </div>
  )
}
