import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import '../../components/cliente/css/cssClienteview.css';
import { Alerts } from '../../components/customHooks/Alerts';

export const FacturaView = () => {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"))

    const {alertRef, showAlertDanger, showAlertSuccess} = Alerts();

    const [tiposDocumentos, setTipoDocumentos] = useState([]);
    const [campañas, setCampañas] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [clienteFound, setClienteFound] = useState(null);
    const [mode, setMode] = useState('create');

    const tipoDocumentoRef = useRef();
    const nombreRef = useRef();
    const apellidoRef = useRef();
    const numeroDocumentoRef = useRef();
    const tiendasRef = useRef();
    const campañasRef = useRef();
    const valorFacturaRef = useRef();
    const numero_factura = useRef();

    
    // TODO: hay un error a la hora de guardar una factura, necesita buscar un cliente para guardar la factura y cuando todo esta vacio debe mostrar un error pero se dana.
    //metodo crear cliente
    function handleSubmit(e) {

        e.preventDefault();

        const factura = {
            cliente_id: clienteFound.id,
            tienda_id: tiendasRef.current.value,
            campaña_id: campañasRef.current.value,
            numero_factura: numero_factura.current.value,
            valor_factura: valorFacturaRef.current.value,
            foto_factura: "sin imagen",
            numero_documento: numeroDocumentoRef.current.value,
            user_id: user.id,
        }

        const URL = mode == 'create' ? 'http://localhost:8000/api/facturas/store' : `http://localhost:8000/api/clientes/update/${clienteFound.numero_documento}`;

        fetch(URL, {
            method: mode == 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(factura)
        }).then(res => res.json()).then(data => {

            if (!data.success) {
                showAlertDanger(data);
                return;
            }
            
            showAlertSuccess(data);
            setMode('create');
            setClienteFound(null);
            cleanInputs();

        });
    }

    //metodo para buscar cliente
    function handleSearchCliente(e) {

        e.preventDefault();

        fetch(`http://localhost:8000/api/clientes/show/${numeroDocumentoRef.current.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        }).then(res => res.json()).then(data => {

            if (data.success == false) {
                setClienteFound(null);
                showAlertDanger(data);
                return;
            }
            setMode('create')
            showAlertSuccess(data);
            setClienteFound(data.data);
        });

    }


    /*metodo para obtener los datos de la api consultar profesiones , tipoDocumentos*/
    useEffect(() => {

        fetch("http://localhost:8000/api/facturas/info-factura", {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                console.log(data)
                const campanas = data.data.campanas.map(campana => {
                    return {
                        value: campana.id,
                        label: campana.nombre
                    }
                });
                console.log(campanas);

                const tiendas = data.data.tiendas.map(tienda => {
                    return {
                        value: tienda.id,
                        label: tienda.nombre
                    }
                });

                console.log(tiendas);

                const documentos = data.data.tipoDocumentos.map(tipoDocumento => {
                    return {
                        value: tipoDocumento.id,
                        label: tipoDocumento.nombre_tipo_documento
                    };
                });

                console.log(documentos);



                setTiendas(tiendas);

                setCampañas(campanas);

                setTipoDocumentos(documentos);

            }).catch(error => console.log(error));


    }, [])


    function cleanInputs() {
        setClienteFound(null);
        nombreRef.current.value = '';
        apellidoRef.current.value = '';
        numeroDocumentoRef.current.value = '';
        valorFacturaRef.current.value = '';
        numero_factura.current.value = '';

        nombreRef.current.clearInputField();
        apellidoRef.current.clearInputField();
        numeroDocumentoRef.current.clearInputField();
        valorFacturaRef.current.clearInputField();
        numero_factura.current.clearInputField();

    }


    return (
        <>

            <section className="background-radial-gradient overflow-lg-hidden vh-160">
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
                                        <h1 style={{ textAlign: 'center' }}>Datos Cliente</h1>
                                        <form onSubmit={handleSubmit}>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-group">
                                                                <label className="form-label" htmlFor="form3Example4">
                                                                    Tipo de documento
                                                                </label>
                                                                <CustomSelect
                                                                    options={tiposDocumentos}
                                                                    elementReferenced={tipoDocumentoRef}
                                                                    value={clienteFound ? clienteFound.tipo_documento_id : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">
                                                                    Numero de documento
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formNumeroDocumento"
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
                                                                    Nombres
                                                                </label>
                                                                <CustomInput
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
                                                                    idInput="formApellido"
                                                                    type="text"
                                                                    elementReferenced={apellidoRef}
                                                                    value={clienteFound ? clienteFound.apellidos : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 style={{ textAlign: 'center' }}>Datos Factura</h1>
                                                    <div className="col-md-12 mb-4">
                                                        <div className="form-outline">
                                                            <label className="form-label" htmlFor="form3Example3">
                                                                Campaña
                                                            </label>
                                                            <CustomSelect
                                                                options={campañas}
                                                                elementReferenced={campañasRef}
                                                                value={clienteFound ? clienteFound.profesion_id : ''}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div className="col-md-12 mb-4">
                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="form3Example4">
                                                                Tienda
                                                            </label>
                                                            <CustomSelect
                                                                options={tiendas}
                                                                elementReferenced={tiendasRef}
                                                                value={clienteFound ? clienteFound.profesion_id : ''}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 lg-md-12 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">
                                                                    Numero factura
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formNumerofactura"
                                                                    type="tel"
                                                                    id="formNumerofactura"
                                                                    elementReferenced={numero_factura}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 mb-4">

                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example2">
                                                                    Valor factura
                                                                </label>
                                                                <CustomInput
                                                                    idInput="formValorFactura"
                                                                    type="tel"
                                                                    elementReferenced={valorFacturaRef}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row justify-content-around my-2">
                                                        
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-consultar btn-lg mb-2" type="button" value="Consultar Cliente" onClick={handleSearchCliente} />
                                                        </div>
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-save btn-lg mb-2" type="submit" value="Registrar Factura" />
                                                        </div>
                                                        <div className="col-12 col-sm-3 d-flex justify-content-center">
                                                            <input className="btn-limpiar  btn-lg mb-2" type="button" value="limpiar Campos" onClick={cleanInputs} />
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