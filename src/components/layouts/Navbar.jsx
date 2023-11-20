
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
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
                            <li className="nav-item">
                                <a className="nav-link" href="#">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Información</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Reportes</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Clientes
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">My profile</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div class="form-inline my-2 my-lg-0 mx-md-0 mx-lg-2">
                            <div className=" collapse navbar-collapse d-flex align-items-center" id="navbarNavDarkDropdown" >
                                <ul class="navbar-nav">
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {renderProfile()}
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="#">My profile</a></li>
                                            <li><a className="dropdown-item" href="#">Settings</a></li>
                                            <li><a className="dropdown-item" href="#">Logout</a></li>
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