
import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';
import React, { useState, useEffect, useRef } from 'react';
import { Storage } from '../../Storage/Storage';
import {hide_alert, show_alert} from '../../components/customHooks/Alerts';

import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';


export const ConsultarProfesiones = () => {


    const [profesiones, setProfesiones] = useState([]);

    const handleImprimir = () => {
        GenerarpdfTablas.getpdfdeTabla('#tableProfesiones',
            'LISTADO DE PROFESIONES', logo);


    };

    useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Storage.getToken('token');
        show_alert('Cargando', 'Cargando Profesiones', 'info');
  
        const response = await fetch("http://localhost:8000/api/profesiones/all-profesiones", {
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
        console.log(data.profesiones);
        setProfesiones(data.profesiones);
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
                <h2 className="tituloTabla text-center mb-4">LISTADO DE PROFESIONES</h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto', paddingTop: '40px' }}>
                    <table id="tableProfesiones" className="table table-bordered table-alternate">
                        <thead>
                            <tr>
                                <th scope="col">No ITEM</th>
                                <th scope="col">DESCRIPCION</th>


                            </tr>
                        </thead>
                        <tbody>
                            {profesiones.map((profesion, index) => (
                                <tr key={profesion.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{profesion.nombre_profesion}</td>
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
