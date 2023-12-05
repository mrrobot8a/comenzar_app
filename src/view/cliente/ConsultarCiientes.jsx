
import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';
import React, { useState, useEffect, useRef } from 'react';
import { Storage } from '../../Storage/Storage';
import { hide_alert, show_alert } from '../../components/customHooks/Alerts';

import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';


export const ConsultarClientes = () => {


    const [clientes, setClientes] = useState([]);

    const handleImprimir = () => {
        GenerarpdfTablas.getpdfdeTabla('#tableProfesiones',
            'LISTADO DE CLIENTES', logo);


    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Storage.getToken('token');
                show_alert('Cargando', 'Cargando Clientes', 'info');

                const response = await fetch("http://localhost:8000/api/clientes/", {
                    method: 'GET',
                    headers: {
                        // 'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                hide_alert();

                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const data = await response.json();
                console.log(data.data);
                setClientes(data.data);
            } catch (error) {
                console.error('Error:', error.message);

            } finally {

            }
        };

        fetchData();
    }, []);



    return (
        <section className="background-radial-gradient overflow-lg-hidden vh-100">
            <div className="container text-center pt-5">
                <h2 className="tituloTabla text-center mb-4">LISTADO DE Clientes</h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto', paddingTop: '40px' }}>
                    <table id="tableProfesiones" className="table table-bordered table-alternate">
                        <thead>
                            <tr>
                                <th scope="col">No ITEM</th>
                                <th scope="col">NUMERO DE IDENTIFICAION</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">APELLIDOS</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">TELEFONO</th>
                                <th scope="col">DIRECCION</th>
                                <th scope="col">HIJOS</th>
                                <th scope="col">FECHA DE NACIMIENTO</th>
                                <th scope="col">MASCOTAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((clientes, index) => (
                                <tr key={clientes.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{clientes.numero_documento}</td>
                                    <td>{clientes.nombre}</td>
                                    <td>{clientes.apellidos}</td>
                                    <td>{clientes.email}</td>
                                    <td>{clientes.telefono}</td>
                                    <td>{clientes.direccion}</td>
                                    <td>{clientes.hijos}</td>
                                    <td>{formatfecha(clientes.fecha_nacimiento)}</td>
                                    <td>{clientes.mascotas}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

                <button className="btn btn-danger mt-5" onClick={handleImprimir}>
                    Imprimir
                </button>
            </div>
        </section>
    );
};
