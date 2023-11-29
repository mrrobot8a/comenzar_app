import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import '../../components/cliente/css/cssClienteview.css';

export const CampañaView = () => {
    //
    const [profesiones, setProfesiones] = useState([]);
    const [tiposDocumentos, setTipoDocumentos] = useState([]);
    

    const [clienteFound, setClienteFound] = useState(null);

    const [mode, setMode] = useState('create');
    //
    const token = localStorage.getItem('token');
    const nombreCampaña = useRef();
    const valorCampaña = useRef();
    const fechaInicio = useRef();
    const fechaCaducidad = useRef();
    const campañaHabilitada = useRef();
    
    const alertRef = useRef();

    //metodo crear cliente
    function handleSubmit(e) {

        e.preventDefault();

        const campaña = {
            
            user_id: 1
        }

        console.log(campaña)

        const URL = mode == 'create' ? 'http://localhost:8000/api/campaña/store' : `http://localhost:8000/api/clientes/update/${clienteFound.numero_documento}`;

        fetch(URL, {
            method: mode == 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(campaña)
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



        console.log(nombreCampaña.current.value);

        fetch(`http://localhost:8000/api/campaña/BuscarCampaña/${nombreCampaña.current.value}`, {
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
    function handleDestroy() {
        if (clienteFound == null) {
            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });
            alertRef.current.classList.remove('d-none', 'alert-danger');
            alertRef.current.classList.add('alert-info', 'd-block');
            alertRef.current.textContent = "Digite el numero de documento del cliente a eliminar";

        } else {
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

            
             
            }).catch(error => console.log(error));


    }, [])


    function cleanInputs() {
        setClienteFound(null);
        nombreCampaña.current.value = '';
        valorCampaña.current.value = '';
        fechaInicio.current.value = null;
        fechaCaducidad.current.value = null;
        campañaHabilitada.current.value = false;
        
        nombreCampaña.current.clearInputField();
        valorCampaña.current.clearInputField();
        fechaInicio.current.clearInputField();
        fechaCaducidad.current.clearInputField();
        campañaHabilitada.current.clearInputField();
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
                                        <h1 style={{ textAlign: 'center' }}>Registro Campaña</h1>
                                        <form onSubmit={handleSubmit}>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">

                                                    <div className="row">

                                                        <div className="col-md-12 mb-2 mt-2">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">
                                                                    Nombre de la campaña
                                                                </label>
                                                                <CustomInput
                                                                    labelPlaceholder="nombre campaña"
                                                                    idInput="formNombreCampaña"
                                                                    type="text"
                                                                    elementReferenced={nombreCampaña}
                                                                    value={clienteFound ? clienteFound.numero_documento : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-4">

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example2">
                                                                    Valor del ticket
                                                                </label>
                                                                <CustomInput
                                                                    labelPlaceholder="N°999"
                                                                    idInput="formValorTicket"
                                                                    type="tel"
                                                                    elementReferenced={valorCampaña}
                                                                    value={clienteFound ? clienteFound.mascotas : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 d-flex align-items-center flex-direction-column justify-content-left p-2">

                                                            <label className="form-label m-2" htmlFor="form3Example1">
                                                                campaña habilitada
                                                            </label>
                                                            <CustomInput
                                                                className={"form-check-input"}
                                                                idInput="formHijos"
                                                                type="checkbox"
                                                                elementReferenced={campañaHabilitada}
                                                                value={clienteFound ? clienteFound.hijos : ''}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">
                                                                    Fecha de inicio
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formDate"
                                                                    type="date"
                                                                    elementReferenced={fechaInicio}
                                                                    value={clienteFound ? clienteFound.fecha_nacimiento : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">
                                                                    Fecha de caducidad
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formDate"
                                                                    type="date"
                                                                    elementReferenced={fechaCaducidad}
                                                                    value={clienteFound ? clienteFound.fecha_nacimiento : ''}
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