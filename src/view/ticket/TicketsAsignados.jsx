import React, { useState, useEffect, useRef } from 'react';
import '../redmirFactura/cssRedimirFactura.css';
import { Alerts } from '../../components/customHooks/Alerts';

export const TicketsAsignados = () => {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"))

    const [campanas, setCampanas] = useState([]);
    const [tickes, setTickets] = useState([]);
    const [valorARedimir, setValorARedimir] = useState(0);
    const [cliente, setCliente] = useState({ numero_documento: '', nombre: '', apellidos: '', id: '' });
    const [facturas, setFacturas] = useState(null);

    const numeroDocumentoRef = useRef();
    const campanaRef = useRef();

    const { alertRef, showAlertDanger, showAlertSuccess } = Alerts();

    function handleSearchClient() {

        if(validateInputsSearch() == false) return 

        fetch(`http://localhost:8000/api/facturas/info-saldo/${numeroDocumentoRef.current.value}/${campanaRef.current.value}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                if (!data.success) {
                    showAlertDanger(data);
                    return
                }
                const { data: cliente } = data;
                setCliente(data.cliente);
                setTickets(data.tickets);
                setFacturas(data.facturas);
                setValorARedimir(data.data);
                showAlertSuccess(data);

            }).catch(error => console.log(error));
    }

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

    function validateInputsSearch()
    {
        if(numeroDocumentoRef.current.value === "")
        {
            
            showAlertDanger({message:"Por favor ingrese el numero de documento del cliente"});
            return false;
        }
    }


    /*metodo para obtener los datos de la api consultar profesiones , tipoDocumentos*/
    useEffect(() => {

        fetch("http://localhost:8000/api/facturas/info-factura", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                const campañas = data.data.campanas.map(campaña => {
                    return {
                        value: campaña.id,
                        nombre: campaña.nombre
                    }
                });

                setCampanas(campañas);

            }).catch(error => console.log(error));

    }, [])

    return (
        <>

            <div className="container_formulario_request ">
                <div className="row  m-2">
                    <h2 className="tituloTabla text-center mb-4 mt-4">Consultar tickets del cliente asignados</h2>

                    <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

                    <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4 mb-4">

                        <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                            <div className="card-body px-4 py-4 px-md-5">
                                <h1 style={{ textAlign: 'center' }}>Estado del cliente</h1>
                                <div>
                                    {/* formulario  */}
                                    <div className="form-row">
                                        <div className="col-md-12 mb-4">
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example3">
                                                            Numero de documento
                                                        </label>
                                                        <input type="text" className='form-control' ref={numeroDocumentoRef} required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example1">
                                                            Nombres completo
                                                        </label>
                                                        <input type="text" className='form-control' value={cliente.nombre} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example2">
                                                            Apellidos
                                                        </label>
                                                        <input type="text" className='form-control' value={cliente.apellidos} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example1">
                                                        Campañas
                                                    </label>
                                                    <select name="" id="" className='form-select' ref={campanaRef}>
                                                        {
                                                            campanas.map((campaña, index) => {
                                                                return <option key={index} value={campaña.value}>{campaña.nombre}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row justify-space-around ">
                                                <div className="col-12 col-sm-3  col-md-4 col-lg-6 d-flex justify-content-center">
                                                    <input className="btn-consultar btn-lg mb-3" type="button" value="Consultar cliente" onClick={handleSearchClient} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4 px-4">
                        <h2 className="tituloTabla text-center mb-4">Facturas Registradas</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <table class="table table-bordered table-alternate">
                                <thead>
                                    <tr>
                                        <th scope="col">Tienda</th>
                                        <th scope="col">N° Facutra</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Valor Factura</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { facturas ? (

                                        facturas.map((factura, index) => {
                                            return <tr key={index}>
                                                <td>{factura.nombre_tienda}</td>
                                                <td>{factura.numero_factura}</td>
                                                <td>{formatfecha(factura.created_at)}</td>
                                                <td>{formatearMonedaCOP(factura.valor_factura)}</td>
                                                <td>{factura.redimido ? 'Redimido' : 'No redimido'}</td>
                                            </tr>
                                        })
                                    ) : (
                                        <tr><td style={{ textAlign: 'center' }} colSpan={5}>No hay facturas</td></tr>
                                    )


                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="row justify-content-center" id="row_table">

                            <div className="col-md-8 col-lg-7 col-12 d-flex mb-4 mt-3 justify-content-center">
                                <label className="labelsaldoporredimir text-sm-sm text-lg-lg" htmlFor="form3Example2">
                                    Saldo por redimir
                                </label>
                                <div className="form-outline">
                                    <input type="text" className='form-control' value={formatearMonedaCOP(valorARedimir)}/>
                                </div>
                            </div>

                        </div>


                        <h2 className="tituloTabla text-center mt-4 mb-4">Tickets Asignados</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <table className="table table-bordered table-alternate">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tickets Asignado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tickes.length > 0 ? (
                                            tickes.map((ticket, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{ticket.numero}</td>
                                                </tr>
                                            })
                                        ): 
                                        (<tr><td style={{ textAlign: 'center' }} colSpan={4}>No hay tickets</td></tr>)
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};