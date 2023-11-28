import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import '../../components/cliente/css/cssClienteview.css';

export const TiendaView = ({user}) => {
    
    const alertRef = useRef();
    const nombreRef = useRef();
    const codigoRef = useRef();

    const token = localStorage.getItem('token');
    
    //metodo crear cliente
    function handleSubmit(e) {

        e.preventDefault();

        const cliente = {
            nombre: nombreRef.current.value,
            user_id: user.id,
            codigo_tienda: codigoRef.current.value,
        }

        const URL = 'http://localhost:8000/api/campañas/store';

        fetch(URL, {
            // method: mode == 'create' ? 'POST' : 'PUT',
            method: 'POST',
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

            
           
            // setMode('create');
            

            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });

            cleanInputs();
            // setClienteFound(null);

            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);

        });

    }


    function cleanInputs()
    { 
        nombreRef.current.clearInputField();
        codigoRef.current.clearInputField();  
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
                                        <h1 style={{ textAlign: 'center' }}>Registro Tienda</h1>
                                        <form onSubmit={handleSubmit}>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">

                                                    <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">
                                                                    Codigo Tienda*
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formNombre"
                                                                    type="tel"
                                                                    elementReferenced={codigoRef}
                                                                    // value={clienteFound ? clienteFound.nombre : ''}
                                                                />
                                                            </div>
                                                        </div>      
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">
                                                                    Nombre Tienda*
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formNombre"
                                                                    type="text"
                                                                    elementReferenced={nombreRef}
                                                                    // value={clienteFound ? clienteFound.nombre : ''}
                                                                />
                                                            </div>
                                                        </div>        
                                                                                                        
                                                    </div>                                                 
                                                    
                                                    <div className="row justify-content-around my-2">
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-save btn-lg mb-2" type="submit" value="Registrar" />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-consultar btn-lg mb-2" type="button" value="Consultar" />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-limpiar  btn-lg mb-2" type="button" value="limpiar" onClick={cleanInputs} />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-delete btn-lg mb-2" type="button" value="Eliminar" />
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