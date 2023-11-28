import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import './cssRedimirFactura.css';


export const RedimirFacturaView = () => {
    //
    const [profesiones, setProfesiones] = useState([]);
    const [tiposDocumentos, setTipoDocumentos] = useState([]);
    const [campañas, setCampañas] = useState([]);
    const [visibeButton, setVisibeButton] = useState(false);
    const [facturas, setFacturas] = useState([]);
    const [datos, setDatos] = useState([]);
    const [tickets, setTicket] = useState([]);
    //


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
    const campañaRef = useRef();
    //
    const alertRef = useRef();

    var i = 0;

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

        const cliente = {

            numero_documento: numeroDocumentoRef.current.value,
            campaña_id: 1,
        }



        console.log(numeroDocumentoRef.current.value);
        fetch(`http://localhost:8000/api/facturas/show`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(cliente)
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

            setVisibeButton(true);

            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });

            alertRef.current.classList.add('d-none', 'alert-info');
            alertRef.current.classList.remove('alert-danger', 'd-block');
            alertRef.current.textContent = data.message;

            console.log('usuario', data.data);

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

    //metodo para buscar facturas
    function handleSearchFacutras(e) {

        e.preventDefault();

        const cliente = {

            numero_documento: numeroDocumentoRef.current.value,
            campaña_id: campañaRef.current.value,
        }



        console.log(numeroDocumentoRef.current.value);
        fetch(`http://localhost:8000/api/facturas/show`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(cliente)
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

            if (data.data.length == 0) {

                alertRef.current.classList.remove('d-none', 'alert-info');
                alertRef.current.classList.add('alert-danger', 'd-block');
                alertRef.current.textContent = "No se encontraron facturas para redimir";
                window.scrollTo({ top: 0, behavior: 'smooth' });

                return;
            }



            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });

            alertRef.current.classList.add('d-none', 'alert-info');
            alertRef.current.classList.remove('alert-danger', 'd-block');
            alertRef.current.textContent = "Facturas encontradas";

            console.log(data);

            setFacturas(data.data);
            setDatos(data);
            console.log('datos', datos);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // cleanInputs();
        });

    }

    // Método para redimir
    async function handleRedimir(e) {

        e.preventDefault();

        console.log('clienteFound:', clienteFound);
        console.log('facturas:', facturas);

        const cliente = {
            cliente_id: clienteFound.id,
            campaña_id: campañaRef.current.value,
        };

        const factura = {

            numero_documento: numeroDocumentoRef.current.value,
            campaña_id: campañaRef.current.value,
        }

        console.log(cliente);
        console.log(factura);

        try {
            const response = await fetch('http://localhost:8000/api/facturas/redimir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });

            const facturas  = await fetch('http://localhost:8000/api/facturas/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(factura),
            });
   

            const datafactura = await facturas.json(); 
                   

            const data = await response.json();

            console.log('data', datafactura.data);


            setTicket(data.ticketsRedimidos)
            setFacturas(datafactura.data);
            setDatos(datafactura)
            console.log('tickets', data.ticketsRedimidos);

            alertRef.current.classList.remove('d-none', 'alert-danger');
            alertRef.current.classList.add('alert-info', 'd-block');
            alertRef.current.textContent = data.message;



            console.log('fctur', data);


            // Desplazarse al inicio de la vista
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                alertRef.current.classList.add('d-none');
            }, 3000);
           
        } catch (error) {
            console.error('Error al redimir factura:', error);
        }
    }

    /*metodo para obtener los datos de la api consultar profesiones , tipoDocumentos*/
    useEffect(() => {

        fetch("http://localhost:8000/api/campañas/", {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);

                const campañas = data.data.map(campaña => {
                    return {
                        value: campaña.id,
                        label: campaña.nombre
                    }
                });


                setCampañas(campañas);

                console.log(campañas);

            }).catch(error => console.log(error));


    }, [])


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
            setClienteFound(data.data);
            alertRef.current.classList.add('d-none', 'alert-info');
            alertRef.current.classList.remove('alert-danger', 'd-block');
            alertRef.current.textContent = 'Cliente encontrado';

            console.log(data.data);




            setVisibeButton(true);
            // window.scrollTo({ top: 0, behavior: 'smooth' });

            // cleanInputs();
        });

    }
    //

    function formatfecha(fechaCompleta) {
        const fechaFormat = new Date(fechaCompleta);

        // Obtener componentes de fecha individualmente
        const año = fechaFormat.getFullYear();
        const mes = fechaFormat.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
        const dia = fechaFormat.getDate();

        // Crear una cadena de fecha formateada
        const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        return fechaFormateada;
    }

    function formatearMonedaCOP(monto) {
        // Formatear el monto como número con separadores de miles
        const montoFormateado = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        }).format(monto);

        return montoFormateado;
    }

    function cleanInputs() {
        setClienteFound(null);
        nombreRef.current.value = '';
        apellidoRef.current.value = '';
        emailRef.current.value = '';
        telefonoRef.current.value = '';
        direccionRef.current.value = '';
        hijosRef.current.value = '';
        numeroDocumentoRef.current.value = '';

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



    }





    return (
        <>

            <div className="container_formulario_request ">
                <div className="row  m-2">
                    <h2 className="tituloTabla text-center mb-4 mt-4">REDIMIR FACTURA</h2>


                    <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

                    <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4 mb-4">

                        <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                            <div className="card-body px-4 py-4 px-md-5">
                                <h1 style={{ textAlign: 'center' }}>Datos del cliente</h1>
                                <form onSubmit={handleSubmit}>
                                    {/* formulario  */}
                                    <div className="form-row">
                                        <div className="col-md-12 mb-4">
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example3">
                                                            Numero de documento
                                                        </label>
                                                        <CustomInput
                                                            labelPlaceholder="N° 1231282"
                                                            idInput="formCelular"
                                                            type="tel"
                                                            elementReferenced={numeroDocumentoRef}
                                                            value={clienteFound ? clienteFound.numero_documento : ''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example1">
                                                            Nombres completo
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
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example2">
                                                            Apellidos
                                                        </label>
                                                        <CustomInput
                                                            labelPlaceholder="apellido cliente"
                                                            idInput="formApellido"
                                                            type="text"
                                                            elementReferenced={apellidoRef}
                                                            value={clienteFound ? clienteFound.apellidos : ''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example1">
                                                        Campañas
                                                    </label>
                                                    <CustomSelect
                                                        options={campañas}
                                                        elementReferenced={campañaRef}
                                                    // value={clienteFound ? clienteFound.profesion_id : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row justify-space-around ">
                                                <div className="col-12 col-sm-3  col-md-4 col-lg-6 d-flex justify-content-center">
                                                    <input className="btn-consultar btn-lg mb-3" type="button" value="Consultar cliente" onClick={handleSearchCliente} />
                                                </div>

                                                <div className="col-12 col-sm-3 col-lg-6 col-md-4 d-flex justify-content-center">
                                                    {visibeButton && (<input className="btn-save btn-lg btn-md mb-3" type="submit" value="Consultar Facturas" onClick={handleSearchFacutras} />)}
                                                </div>


                                                <div className="col-6 col-sm-3 col-lg-6 col-md-4 d-flex justify-content-center">
                                                    <input className="btn-limpiar  btn-lg mb-3" type="button" value="Redimir saldo" onClick={handleRedimir} />
                                                </div>
                                                <div className="col-6 col-sm-3 col-lg-6 col-md-12 d-flex justify-content-center">
                                                    <input className="btn-delete btn-lg mb-2" type="button" value="Imprimir ticket" onClick={handleDestroy} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4 px-4">
                        <h2 className="tituloTabla text-center mb-4">FACTURAS DEL CLIENTE POR REDIMIR</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <table class="table table-bordered table-alternate">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tienda</th>
                                        <th scope="col">N° Facutra</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Valor Factura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturas && (
                                        facturas.map(facturas => (

                                            <tr key={facturas.id}>
                                                <th scope="row">{i++}</th>
                                                <td>{facturas.nombre_tienda}</td>
                                                <td>{facturas.numero_factura}</td>
                                                <td>{formatfecha(facturas.created_at)}</td>
                                                <td>{formatearMonedaCOP(facturas.valor_factura)}</td>
                                                {/* <td className="d-flex gap-2">
                                                <button className="btn btn-primary btn-sm" onClick={handleEditClient}>Editar</button>
                                                <button className="btn btn-danger btn-sm" onClick={handleDestroy}>Eliminar</button>
                                            </td> */}
                                            </tr>

                                        )
                                        )

                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="row justify-content-center" id="row_table">

                            <div className="col-md-8 col-lg-7 col-12 d-flex mb-4 mt-3 justify-content-center">
                                <label className="labelsaldoporredimir text-sm-sm text-lg-lg" htmlFor="form3Example2">
                                    Saldo por redimir
                                </label>
                                <div className="form-outline">
                                    <CustomInput
                                        labelPlaceholder="Saldo por redimir"
                                        idInput="formSaldoPorRedimir"
                                        type="text"
                                        elementReferenced={apellidoRef}
                                        value={datos ? formatearMonedaCOP(datos.totalARedimir) : ''}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                        </div>


                        <h2 className="tituloTabla text-center mt-4 mb-4">TICKETS</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <table class="table table-bordered table-alternate">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">No Ticket Asignado</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {tickets && (

                                        tickets.map(tickets => (

                                            <tr key={i + 1}>
                                                <th scope="row">{i++}</th>
                                                <td>{tickets.numero}</td>
                                                {/* <td className="d-flex gap-2">
                                                <button className="btn btn-primary btn-sm" onClick={handleEditClient}>Editar</button>
                                                <button className="btn btn-danger btn-sm" onClick={handleDestroy}>Eliminar</button>
                                            </td> */}
                                            </tr>

                                        )
                                        )

                                    )}

                                </tbody>
                            </table>
                        </div>





                    </div>
                </div>

            </div>
        </>
    );
};