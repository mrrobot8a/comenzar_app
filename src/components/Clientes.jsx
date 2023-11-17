import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom";

export const Clientes = () => {

    const [info, setInfo] = useState(null)
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const profesionRef = useRef();
    const tipoDocumentoRef = useRef();
    const nombreRef = useRef();
    const apellidoRef = useRef();
    const emailRef = useRef();
    const telefonoRef = useRef();
    const direccionRef = useRef();
    const fechaNacimientoRef = useRef();
    const hijosRef = useRef();
    const numeroDocumentoRef = useRef();
    const mascotasRef = useRef();
    const alertRef = useRef();

    const searchRef = useRef();

    const [clienteFound, setClienteFound] = useState(null);

    const [mode, setMode] = useState('create');


    useEffect(() => {

        fetch("http://localhost:8000/api/clientes/info", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setInfo(data);
            })
            .catch(error => console.error('Error:', error));

    }, [])

    function handleSubmitCliente(e) {

        e.preventDefault();

        const cliente = {
            profesion_id: profesionRef.current.value,
            tipo_documento_id: tipoDocumentoRef.current.value,
            nombre: nombreRef.current.value,
            apellidos: apellidoRef.current.value,
            email: emailRef.current.value,
            telefono: telefonoRef.current.value,
            direccion: direccionRef.current.value,
            fecha_nacimiento: fechaNacimientoRef.current.value,
            hijos: hijosRef.current.value,
            numero_documento: numeroDocumentoRef.current.value,
            mascotas: mascotasRef.current.checked,
            user_id: user.id
        }

        const URL = mode == 'create' ? 'http://localhost:8000/api/clientes/store' : `http://localhost:8000/api/clientes/update/${searchRef.current.value}`;

        fetch(URL, {
            method: mode == 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                
            },
            body: JSON.stringify(cliente)
        }).then(res => res.json()).then(data => {

            if(data.success == false){

                alertRef.current.classList.remove('d-none', 'alert-info');
                alertRef.current.classList.add('alert-danger');
                alertRef.current.textContent = "Los datos introducidos son incorrectos, por favor verificarlos";
                // Desplazarse al inicio de la vista
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
                
            }

            alertRef.current.classList.remove('d-none', 'alert-danger');
            alertRef.current.classList.add('alert-info', 'd-block');
            alertRef.current.textContent = data.message;
            
            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });

            cleanInputs();

            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);

        });

    }

    function cleanInputs()
    {
        nombreRef.current.value = '';
        apellidoRef.current.value = '';
        emailRef.current.value = '';
        telefonoRef.current.value = '';
        direccionRef.current.value = '';
        fechaNacimientoRef.current.value = '';
        hijosRef.current.value = '';
        numeroDocumentoRef.current.value = '';
        mascotasRef.current.checked = false;
        searchRef.current.value = '';
    }

    function handleSearchCliente(e) {

        e.preventDefault();

        fetch(`http://localhost:8000/api/clientes/show/${searchRef.current.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                
            }
        }).then(res => res.json()).then(data => {

            if(data.success == false){
                setClienteFound(null);
                return;
            }

            setClienteFound(data.data);
        });

    }


    function handleEditClient() 
    {
        setMode('edit');
        nombreRef.current.value = clienteFound.nombre;
        apellidoRef.current.value = clienteFound.apellidos;
        emailRef.current.value = clienteFound.email;
        telefonoRef.current.value = clienteFound.telefono;
        direccionRef.current.value = clienteFound.direccion;
        fechaNacimientoRef.current.value = clienteFound.fecha_nacimiento;
        hijosRef.current.value = clienteFound.hijos;
        numeroDocumentoRef.current.value = clienteFound.numero_documento;
    }

    return (
        <>
        <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

        <div className="d-flex align-items-center justify-content-center mb-5">
            <form className="card bg-light w-50" onSubmit={handleSearchCliente}>
                <div className="card-body d-flex justify-content-center align-items-center gap-3">
                    
                    <input type="text" className="form-control text-muted" ref={searchRef} required placeholder="Buscar cliente.."/>

                    <button style={{width: '20%'}} type="submit" className="btn btn-primary d-block w-100 my-4">Buscar</button>
                </div>
            </form>
        </div>

        <table className="table table-dark table-striped mb-5">
            <thead>
                <tr>
                    <th scope="col">Profesion</th>
                    <th scope="col">Tipo de documento</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Email</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Fecha de nacimiento</th>
                    <th scope="col"># Hijos</th>
                    <th scope="col">Número de documento</th>
                    <th scope="col">Mascotas</th>
                    <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody>
                {clienteFound && (
                    <tr>

                        <td>{clienteFound.profesion}</td>
                        <td>{clienteFound.tipo_documento}</td>
                        <td>{clienteFound.nombre}</td>
                        <td>{clienteFound.apellidos}</td>
                        <td>{clienteFound.email}</td>
                        <td>{clienteFound.telefono}</td>
                        <td>{clienteFound.direccion}</td>
                        <td>{clienteFound.fecha_nacimiento}</td>
                        <td>{clienteFound.hijos}</td>
                        <td>{clienteFound.numero_documento}</td>
                        <td>{clienteFound.mascotas ? 'Si' : 'No'}</td>
                        <td className="d-flex gap-2">
                            <button className="btn btn-primary btn-sm" onClick={handleEditClient}>Editar</button>
                            <button className="btn btn-danger btn-sm">Eliminar</button>
                        </td>                        
                    </tr>
                )}
            </tbody>
        </table>
        
        <div className="d-flex align-items-center justify-content-center mb-5">
            <form className="card bg-light w-50" onSubmit={handleSubmitCliente}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Profesion</label>
                        <select name="" className="form-select" id="" ref={profesionRef} required>
                            {info && mode === 'create' && (
                                info.profesiones.map((profesion, index) => {
                                    return (
                                        <option key={index} value={profesion.id}>{profesion.nombre_profesion}</option>
                                    )
                                })
                            )
                            }

                            {info && mode === 'edit' && (
                                info.profesiones.map((profesion, index) => {
                                    return (
                                        <option key={index} value={profesion.id} selected={profesion.id === clienteFound.profesion_id}>{profesion.nombre_profesion}</option>
                                    )
                                })
                            )
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo de documento</label>
                        <select name="" className="form-select" id="" ref={tipoDocumentoRef} required>
                            {info && (
                                info.tipoDocumentos.map((documento, index) => {
                                    return (
                                        <option key={index} value={documento.id}>{documento.nombre_tipo_documento}</option>
                                    )
                                })
                            )
                            }

                            {info && mode === 'edit' && (
                                info.tipoDocumentos.map((documento, index) => {
                                    return (
                                        <option key={index} value={documento.id} selected={documento.id === clienteFound.tipo_documento_id}>{documento.nombre_tipo_documento}</option>
                                    )
                                })
                            )
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control text-muted" ref={nombreRef} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" className="form-control text-muted" ref={apellidoRef} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control text-muted" ref={emailRef} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Telefono</label>
                        <input type="text" className="form-control text-muted" ref={telefonoRef} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control text-muted" ref={direccionRef} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de nacimiento</label>
                        {
                            mode === 'edit' && (
                                <input type="date" className="form-control text-muted" ref={fechaNacimientoRef} value={new Date(clienteFound.fecha_nacimiento).toISOString().split('T')[0]} required/>
                            )
                        }
                        {
                            mode === 'create' && (
                                <input type="date" className="form-control text-muted" ref={fechaNacimientoRef} required/>
                            )
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de hijos</label>
                        <input type="text" className="form-control text-muted" ref={hijosRef} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de documento</label>
                        <input type="text" className="form-control text-muted" ref={numeroDocumentoRef} required/>
                    </div>
                    <div className="form-check">
                        {
                            mode === 'edit' && (
                                <input className="form-check-input" type="checkbox" ref={mascotasRef} defaultChecked={clienteFound.mascotas} />
                            )
                        }

                        {
                            mode === 'create' && (
                                
                                <input className="form-check-input" type="checkbox" ref={mascotasRef} />
                            )
                        }
                        <label className="form-check-label">
                            Tienes mascotas?
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary d-block w-100 my-4">Guardar</button>
                </div>
            </form>
        </div>
        </>
    )
}