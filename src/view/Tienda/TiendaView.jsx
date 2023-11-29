import React, { useRef, useState } from 'react';
import '../../components/cliente/css/cssClienteview.css';
import { Alerts } from '../../components/customHooks/Alerts';

export const TiendaView = () => {
    
    const {alertRef, showAlertDanger, showAlertSuccess} = Alerts();
    
    const nombreRef = useRef();
    const codigoRef = useRef();

    const token = localStorage.getItem('token');

    const user = JSON.parse(localStorage.getItem("user"))

    function handleSubmit(e) {

        e.preventDefault();

        if(validateInputsCreate() == false){
            return;
        }
        
        const cliente = {
            nombre: nombreRef.current.value,
            user_id: user.id,
            codigo_tienda: codigoRef.current.value,
        }

        const URL = 'http://localhost:8000/api/tiendas/store';

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

                showAlertDanger(data);
                return;
            }

            showAlertSuccess(data);

            cleanInputs();

        });

    }

    function handleSearch() {

        if(validateInputsSearch() == false){
            return;
        }

        const URL = `http://localhost:8000/api/tiendas/show/${codigoRef.current.value}`;

        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        }).then(res => res.json()).then(data => {

            if (!data.success) {

                showAlertDanger(data);
                return;
            }

            nombreRef.current.value = data.tienda.nombre;
            codigoRef.current.value = data.tienda.codigo_tienda;

        });

    }

    function handleDelete() {

        if(validateInputsSearch() == false){
            return;
        }

        const URL = `http://localhost:8000/api/tiendas/destroy/${codigoRef.current.value}`;

        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        }).then(res => res.json()).then(data => {

            if (!data.success) {

                showAlertDanger(data);
                return;
            }

            showAlertSuccess(data);

            cleanInputs();

        });
    }

    function cleanInputs()
    { 
        nombreRef.current.value = "";
        codigoRef.current.value = "";  
    }

    function validateInputsCreate()
    {
        if(nombreRef.current.value == "" || codigoRef.current.value == "")
        {

            alertRef.current.classList.remove('d-none', 'alert-info');
            alertRef.current.classList.add('alert-danger');
            alertRef.current.textContent = "Los datos introducidos son incorrectos, por favor verificarlos";
            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);
            return false;
        }
    }

    function validateInputsSearch()
    {
        if(codigoRef.current.value === "")
        {
            
            alertRef.current.classList.remove('d-none', 'alert-info');
            alertRef.current.classList.add('alert-danger');
            alertRef.current.textContent = "Los datos introducidos son incorrectos, por favor verificarlos";
            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);
            return false;
        }
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
                                <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

                                <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                                    <div className="card-body px-4 py-4 px-md-5">
                                        <h1 style={{ textAlign: 'center' }}>Registro Tienda</h1>
                                        <div>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">

                                                    <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">
                                                                    Codigo Tienda*
                                                                </label>
                                                                <input type="text" ref={codigoRef} className='form-control' required/>
                                                            </div>
                                                        </div>      
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">
                                                                    Nombre Tienda*
                                                                </label>
                                                                <input type="text" className='form-control' ref={nombreRef}/>
                                                            </div>
                                                        </div>        
                                                                                                        
                                                    </div>                                                 
                                                    
                                                    <div className="row justify-content-around my-2">
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-save btn-lg mb-2" type="submit" value="Registrar" onClick={handleSubmit}/>
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-consultar btn-lg mb-2" type="button" value="Consultar" onClick={handleSearch}/>
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-limpiar  btn-lg mb-2" type="button" value="limpiar" onClick={cleanInputs} />
                                                        </div>
                                                        <div className="col-6 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-delete btn-lg mb-2" type="button" value="Eliminar" onClick={handleDelete}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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