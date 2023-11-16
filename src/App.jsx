import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Login } from "./components/Login"
import { Home } from "./components/Home"

export const App = () => {  

  return (
    <div className="container">

      <Navbar/>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>

    </div>
  )
}
