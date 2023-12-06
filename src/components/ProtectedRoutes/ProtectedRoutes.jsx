import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Storage } from '../../Storage/Storage'
import { Navbar } from "../layouts/Navbar"

//componente de rutas protegidas
export const ProtectedRoutes = ({children}) => {

    const token = Storage.getToken('token');
    
    if (!token) {
     
      return <Navigate to="/login" />
    }

  return <Outlet />
}

export default ProtectedRoutes