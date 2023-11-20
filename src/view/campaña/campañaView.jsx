import React, { useEffect, useState, useRef } from "react"


import { CustomInput } from "../../components/global/CustomInput"
import { CustomSelect } from "../../components/global/CustomSelect"

export const CampañaView = () => {

    const [otroProfesionValue, setOtroProfesionValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de manejo del formulario
        console.log("Formulario enviado");
    };


    const handleConsult = (e) => {
        e.preventDefault();
        // Lógica de manejo de la consulta
        console.log("Consulta realizada");

    };

    const handleProfessionChange = (e) => {
        const inputField = document.getElementById('otroprofesion');
        inputField.style.display = e.target.value === 'Otraprofesion' ? 'block' : 'none';
    };

    const handleOtroProfesionChange = (e) => {
        const value = e.target.value;
        setOtroProfesionValue(value);
        console.log(value);
        console.log(otroProfesionValue.length);
        console.log(otroProfesionValue.toUpperCase());
        console.log(otroProfesionValue[0]);
    };

    // useEffect(() => {

    //     fetch("http://localhost:8000/api/clientes/info", {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setInfo(data);
    //         })
    //         .catch(error => console.error('Error:', error));

    // }, [])


    const optionsProfesiones = [
        { value: 'Estudiante', label: 'Estudiante' },
        { value: 'Empleado', label: 'Empleado' },
        { value: 'Independiente', label: 'Independiente' },
        // ... otras opciones
        { value: 'Otraprofesion', label: 'Otro' },
    ];

    const optionesTipoDocumento = [
        { value: 'Cedula', label: 'Cedula' },
        { value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' },
        { value: 'Pasaporte', label: 'Pasaporte' },
        { value: 'Cedula extranjera', label: 'Cedula extranjera' },
        { value: 'Otraprofesion', label: 'Otro' },
    ];

    return (
        <>
            <section className="background-radial-gradient overflow-lg-hidden vh-150">
                <div className="container-fluid d-flex align-items-center justify-content-center overflow-auto"> {/* new contenido */}
                    <div className="container_formulario_request mb-4 mb-sm-O ">
                        <div className="container_formulario_text">

                            <div className="text_info d-none d-lg-block">
                                <h1 className="my-5 display-5 fw-bold ls-tight">
                                    CRM para Centros Comerciales <br />
                                    <span style={{ color: 'hsl(218, 81%, 75%)' }}>Para Registrar tus Compras</span>
                                </h1>
                                <p className="mb-4 opacity-70">
                                    {/* Texto opcional */}
                                </p>
                            </div>

                            <div className="col-lg-6 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4">
                                <div id="radius-shape-1" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
                                <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                                    <div className="card-body px-4 py-4 px-md-5">
                                        <h1 style={{ textAlign: 'center' }}>Registro Cliente</h1>
                                        <form onSubmit={handleSubmit}>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">Nombres campaña</label>
                                                                <CustomInput labelPlaceholder="Nombre cliente" idInput="formNombre" type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example2">Apellidos completo</label>
                                                                <CustomInput labelPlaceholder="apellido cliente" idInput="formApellido" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">Numero de documento</label>
                                                                <CustomInput labelPlaceholder="N° 1231282" idInput="formCelular" type="tel" />

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-group">
                                                                <label className="form-label" htmlFor="form3Example4">Tipo de documento</label>
                                                                <CustomSelect options={optionesTipoDocumento} onOtroProfesionChange={handleOtroProfesionChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">Teléfono</label>
                                                                <CustomInput labelPlaceholder="# Celular" idInput="formCelular" type="tel" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">Correo electronico</label>
                                                                <CustomInput labelPlaceholder="example@example.com" idInput="formEmail" type="email" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-12 mb-4">
                                                        <div className="form-outline">
                                                            <label className="form-label" htmlFor="form3Example2">Dirección</label>
                                                            <CustomInput labelPlaceholder="example av.33 #23-34" idInput="formDireccion" type="text" />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">Numero de hijos</label>
                                                                <CustomInput labelPlaceholder="N°999" idInput="formHijos" type="tel" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example2">Numero de mascotas</label>
                                                                <CustomInput labelPlaceholder="N°999" idInput="formMascotas" type="tel" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">Fecha Nacimiento</label>

                                                                <CustomInput idInput="formDate" type="date" />

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-group">
                                                                <label className="form-label" htmlFor="form3Example4">Profesión</label>
                                                                <CustomSelect options={optionsProfesiones} />
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="row justify-content-around my-2">
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn btn-success btn-lg mb-2" type="submit" value="Registrar" />
                                                        </div>
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn btn-warning btn-lg mb-2" type="submit" value="Editar" />
                                                        </div>
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn btn-danger btn-lg mb-2" type="button" value="Eliminar" />
                                                        </div>
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn btn-primary btn-lg mb-2" type="button" value="Consultar" onClick={handleConsult} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* formulario end  */}
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
}