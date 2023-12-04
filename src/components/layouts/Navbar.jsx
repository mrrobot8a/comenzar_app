
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Storage } from '../../Storage/Storage';
import './css/cssNavbar/Navbar.css'

export const Navbar = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const renderProfile = () => {

        if (isMobile) {
            return <span>Perfil</span>;
        } else {
            return <img className="rounded-circle" height="50" alt="" loading="lazy" />;
        }
    };

    //instanciamos el navigate para redireccionar ala diferentes pages
    const go = useNavigate();
    function logout() {
        Storage.removeToken();
        Storage.removeUser();
        Storage.clearStorage();
        //mandamos la peticion de enpoint de logout
        //redireccionamos al page login
        go('/login');
    }



    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <a className="navbar-brand mt-2 mt-lg-0" href="/">
                        <img className="rounded-circle" loading="lazy" />
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Configuracion
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Registrar tipo documento</a></li>
                                    <li><a className="dropdown-item" href="#">Registrar profesiones</a></li>
                                </ul>
                            </li>


                            <li className="nav-item dropdown" style={{ whiteSpace: 'nowrap', }} >
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Gestion de Procesos
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/clientes" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Gestionar Clientes
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/tiendas" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Gestionar Tienda
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/campañas" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Gestionar Campaña
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/facturas" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Gestionar Facturas
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/redimir-facturas" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Redimir Facturas
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/estado-cliente" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Estado Cliente
                                        </Link>
                                    </li>




                                </ul>
                            </li>
                            <li className="nav-item dropdown" style={{ whiteSpace: 'nowrap', }} >
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Consultas
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Facturas redimidas
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Tickets asignados por campaña
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Tickets asignados por cliente
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/tienda-estadistica" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Estadistica por tienda
                                        </Link>
                                    </li>




                                </ul>
                            </li>
                            <li className="nav-item dropdown" style={{ whiteSpace: 'nowrap', }} >
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Reportes
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/consultar-profesiones" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Listar profesiones
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/consultar-campañas" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Listar Campañas
                                        </Link>
                                    </li>

                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '40px' }}>
                                        <Link to="/consultar-tiendas" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Listar Tiendas
                                        </Link>
                                    </li>
                                    <li className='nav-item list-group-item list-group-item-action small-item d-flex align-items-center' style={{ height: '45px' }}>
                                        <Link to="/consultar-clientes" className="nav-link active" style={{ fontSize: '15px', }}>
                                            Listar Clientes
                                        </Link>
                                    </li>





                                </ul>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0 mx-md-0 mx-lg-2">
                            <div className=" collapse navbar-collapse d-flex align-items-center" id="navbarNavDarkDropdown" >
                                <ul class="navbar-nav">
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {renderProfile()}
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="#">My profile</a></li>
                                            <li><a className="dropdown-item" href="#">Settings</a></li>
                                            <li><a className="dropdown-item" onClick={logout} href="#">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
};