import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import '../../components/cliente/css/cssClienteview.css';

export const ProfesionView = () => {
    //
    const [profesiones, setProfesiones] = useState([]);
    const [tiposDocumentos, setTipoDocumentos] = useState([]);

    const [clienteFound, setClienteFound] = useState(null);

    const [mode, setMode] = useState('create');
    //
    const token = localStorage.getItem('token');
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
    //
    const alertRef = useRef();

    // const user = JSON.parse(localStorage.getItem('user'));
    
    //metodo crear cliente
    function handleSubmit(e) {

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
            mascotas: mascotasRef.current.value,
            user_id: 1
        }

        console.log(cliente)

        const URL = mode == 'create' ? 'http://localhost:8000/api/clientes/store' : `http://localhost:8000/api/clientes/update/${clienteFound.numero_documento}`;

        fetch(URL, {
            method: mode == 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(cliente)
        }).then(res => res.json()).then(data => {

            if (!data.success) {

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

            
           
            setMode('create');
            

            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });

            cleanInputs();
            setClienteFound(null);

            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);

        });




    }

    //metodo para buscar cliente
    function handleSearchCliente(e) {

        e.preventDefault();
 
      

        console.log(numeroDocumentoRef.current.value);
        fetch(`http://localhost:8000/api/clientes/show/${numeroDocumentoRef.current.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`

            }
        }).then(res => res.json()).then(data => {

            // setMode('create');

            if (data.success == false) {
                setClienteFound(null);
                alertRef.current.classList.remove('d-none', 'alert-info');
                alertRef.current.classList.add('alert-danger', 'd-block');
                alertRef.current.textContent = data.message;
                window.scrollTo({ top: 0, behavior: 'smooth' });
               
                return;
            }
            setMode('update')

            // Desplazarse al inicio de la vista
             window.scrollTo({ top: 0, behavior: 'smooth' });

            alertRef.current.classList.add('d-none', 'alert-info');
            alertRef.current.classList.remove('alert-danger', 'd-block');
            alertRef.current.textContent = data.message;

            console.log(data.data);

            setClienteFound(data.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // cleanInputs();
        });

    }

    //metodo para eliminar un usuario
    function handleDestroy()
    {
        if (clienteFound == null) {
            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });
            alertRef.current.classList.remove('d-none', 'alert-danger');
            alertRef.current.classList.add('alert-info', 'd-block');
            alertRef.current.textContent = "Digite el numero de documento del cliente a eliminar";

        }else{
        fetch(`http://localhost:8000/api/clientes/delete/${clienteFound.numero_documento}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
                
            }
        }).then(res => res.json()).then(data => {
            
            cleanInputs();
            alertRef.current.classList.remove('d-none', 'alert-danger');
            alertRef.current.classList.add('alert-info', 'd-block');
            alertRef.current.textContent = data.message;
            setClienteFound(null);
            setMode('create');
            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);

        });
    }
    }

    /*metodo para obtener los datos de la api consultar profesiones , tipoDocumentos*/
    useEffect(() => {

        fetch("http://localhost:8000/api/clientes/info", {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                const profesiones = data.profesiones.map(profesion => {
                    return {
                        value: profesion.id,
                        label: profesion.nombre_profesion
                    }
                })

                const documentos = data.tipoDocumentos.map(tipoDocumento => {
                    return {
                        value: tipoDocumento.id,
                        label: tipoDocumento.nombre_tipo_documento
                    }
                })

                setProfesiones(profesiones);

                setTipoDocumentos(documentos);

            }).catch(error => console.log(error));


    }, [])


    function cleanInputs()
    { 
        setClienteFound(null);
        nombreRef.current.value = '';
        apellidoRef.current.value = '';
        emailRef.current.value = '';
        telefonoRef.current.value = '';
        direccionRef.current.value = '';
        hijosRef.current.value = '';
        numeroDocumentoRef.current.value = '';
        mascotasRef.current.value= '';
        fechaNacimientoRef.current.value = null;

        nombreRef.current.clearInputField();
        apellidoRef.current.clearInputField();
        numeroDocumentoRef.current.clearInputField();
        emailRef.current.clearInputField();
        telefonoRef.current.clearInputField();
        direccionRef.current.clearInputField();
        fechaNacimientoRef.current.clearInputField();
        hijosRef.current.clearInputField();
        numeroDocumentoRef.current.clearInputField();
        mascotasRef.current.clearInputField();      


    }


    


    return (
        <>
            
            <section className="background-radial-gradient overflow-lg-hidden vh-100">
                <div className="container-fluid d-flex align-items-center justify-content-center overflow-auto">
                    <div className="container_formulario_request mb-4 mb-sm-O ">
                        <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>
                        <div className="container_formulario_text">
                            <div className="text_info d-none d-lg-block">
                                <h1 className="my-5 display-5 fw-bold ls-tight">
                                    CRM para Centros Comerciales <br />
                                    
                                </h1>
                                <p className="mb-4 opacity-70">
                                    {/* Texto opcional */}
                                </p>
                            </div>

                            <div className="col-lg-6 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4">
                                <div id="radius-shape-1" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
                                <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

                                <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                                    <div className="card-body px-4 py-4 px-md-5">
                                        <h1 style={{ textAlign: 'center' }}>Registro Profesiones</h1>
                                        <form onSubmit={handleSubmit}>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">
                                                                    Nombre profesion
                                                                </label>
                                                                <CustomInput
                                                                    labelPlaceholder="Nombre cliente"
                                                                    idInput="formNombre"
                                                                    type="text"
                                                                    elementReferenced={nombreRef}
                                                                    value={clienteFound ? clienteFound.nombre : ''}
                                                                />
                                                            </div>
                                                        </div>                                                       
                                                    </div>                                                 
                                                    
                                                    <div className="row justify-content-around my-2">
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-save btn-lg mb-2" type="submit" value="Registrar" />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-consultar btn-lg mb-2" type="button" value="Consultar" onClick={handleSearchCliente} />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-limpiar  btn-lg mb-2" type="button" value="limpiar" onClick={cleanInputs} />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-delete btn-lg mb-2" type="button" value="Eliminar" onClick={handleDestroy} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};