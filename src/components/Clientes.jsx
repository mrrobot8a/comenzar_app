import { useEffect, useState, useRef } from "react"

export const Clientes = () => {

    const [info, setInfo] = useState(null)
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
    const userIdRef = useRef();
    const alertRef = useRef();


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
            user_id: userIdRef.current.value
        }

        fetch("http://localhost:8000/api/clientes/store", {
            method: 'POST',
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
    }


    return (
        <>
        <div className="alert alert-info d-none" role="alert" ref={alertRef}>
        
        </div>
            <div className="d-flex align-items-center justify-content-center mb-5">
                <form className="card bg-light w-50" onSubmit={handleSubmitCliente}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Profesion</label>
                            <select name="" className="form-select" id="" ref={profesionRef} required>
                                {info && (
                                    info.profesiones.map((profesion, index) => {
                                        return (
                                            <option key={index} value={profesion.id}>{profesion.nombre_profesion}</option>
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
                            <input type="date" className="form-control text-muted" ref={fechaNacimientoRef} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número de hijos</label>
                            <input type="text" className="form-control text-muted" ref={hijosRef} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número de documento</label>
                            <input type="text" className="form-control text-muted" ref={numeroDocumentoRef} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Operador</label>
                            <select name="" className="form-select" id="" ref={userIdRef} required>
                                {info && (
                                    info.operadores.map((operador, index) => {
                                        return (
                                            <option key={index} value={operador.id}>{operador.name}</option>
                                        )
                                    })
                                )
                                }
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" ref={mascotasRef} required/>
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