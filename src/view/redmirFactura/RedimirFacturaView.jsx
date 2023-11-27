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
            setVisibeButton(true);

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

        fetch("http://localhost:8000/api/campaña/", {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                // const profesiones = data.profesiones.map(profesion => {
                //     return {
                //         value: profesion.id,
                //         label: profesion.nombre_profesion
                //     }
                // })

                // const documentos = data.tipoDocumentos.map(tipoDocumento => {
                //     return {
                //         value: tipoDocumento.id,
                //         label: tipoDocumento.nombre_tipo_documento
                //     }
                // })

                // setProfesiones(profesiones);

                // setTipoDocumentos(documentos);

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


    function cleanInputs() {
        setClienteFound(null);
        nombreRef.current.value = '';
        apellidoRef.current.value = '';
        emailRef.current.value = '';
        telefonoRef.current.value = '';
        direccionRef.current.value = '';
        hijosRef.current.value = '';
        numeroDocumentoRef.current.value = '';
        mascotasRef.current.value = '';
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

            <div className="container_formulario_request ">
                <div className="row  m-2">
                    <h2 className="tituloTabla text-center mb-4 mt-4">REDIMIR FACTURA</h2>


                    <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

                    <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4 mb-4">

                        <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

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
                                                        elementReferenced={profesionRef}
                                                        value={clienteFound ? clienteFound.profesion_id : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row justify-space-around ">
                                                <div className="col-12 col-sm-3  col-md-4 col-lg-6 d-flex justify-content-center">
                                                    <input className="btn-consultar btn-lg mb-3" type="button" value="Consultar cliente" onClick={handleSearchCliente} />
                                                </div>

                                                <div className="col-12 col-sm-3 col-lg-6 col-md-4 d-flex justify-content-center">
                                                    {visibeButton && (<input className="btn-save btn-lg btn-md mb-3" type="submit" value="Consultar saldo" />)}
                                                </div>


                                                <div className="col-6 col-sm-3 col-lg-6 col-md-4 d-flex justify-content-center">
                                                    <input className="btn-limpiar  btn-lg mb-3" type="button" value="Redimir saldo" onClick={cleanInputs} />
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Koaj</td>
                                        <td>021</td>
                                        <td>05/01/2023</td>
                                        <td>$200.000</td>
                                       
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Puma</td>
                                        <td>022</td>
                                        <td>01/01/2023</td>
                                        <td>$200.000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Koaj</td>
                                        <td>024</td>
                                        <td>05/07/2023</td>
                                        <td>$200.000</td>
                                       
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Adidas</td>
                                        <td>025</td>
                                        <td>05/02/2022</td>
                                        <td>$200.000</td>
                                       
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Koaj</td>
                                        <td>026</td>
                                        <td>09/25/2023</td>
                                        <td>$200.000</td>
                                     
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>arturo</td>
                                        <td>027</td>
                                        <td>05/14/2023</td>
                                        <td>$200.000</td>
                                      
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Koaj</td>
                                        <td>028</td>
                                        <td>12/01/2023</td>
                                        <td>$200.000</td>
                                       
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>arturo</td>
                                        <td>034</td>
                                        <td>24/08/2023</td>
                                        <td>$200.000</td>
                                       
                                    </tr>
                                    
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>H&M</td>
                                        <td>056</td>
                                        <td>12/02/2023</td>
                                        <td>$200.000</td>
                                       
                                    </tr>
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
                                        value={clienteFound ? clienteFound.apellidos : ''}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                        </div>


                        <h2 className="tituloTabla text-center mt-4 mb-4">TICKETS</h2>

                        <table class="table table-bordered table-alternate">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">No Ticket Asignado</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>0432</td>

                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>123</td>

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>1245</td>

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>1245</td>

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>1245</td>

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>1245</td>

                                </tr>
                            </tbody>
                        </table>





                    </div>
                </div>

            </div>
        </>
    );
};