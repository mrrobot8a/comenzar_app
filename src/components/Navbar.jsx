import {Link} from 'react-router-dom'
export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand">CRM</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link className="nav-item text-decoration-none" to="/clientes">
                                <span className="nav-link active">Clientes</span>
                            </Link>
                            <Link className="nav-item text-decoration-none" to="/clientes">
                                <span className="nav-link">Campañas</span>
                            </Link>
                            <Link className="nav-item text-decoration-none" to="/clientes">
                                <span className="nav-link">Facturas</span>
                            </Link>
                            <Link className="nav-item text-decoration-none" to="/clientes">
                                <span className="nav-link">Administración</span>
                            </Link>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/login" className='text-decoration-none'><span className="dropdown-item" >Login</span></Link>
                                    <li><a className="dropdown-item">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar.."/>
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}