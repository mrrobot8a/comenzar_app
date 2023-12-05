import React, { useState, useEffect, useRef } from 'react';
import { Storage } from '../../Storage/Storage';
import {show_alert,hide_alert} from '../../components/customHooks/Alerts';

import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';

import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';



export const ConsultarCampañas = () => {
 
    const [campañas, setCampañas] = useState([]);   


    useEffect(() => {

        const fetchData = async () => {
          try {
            const token = Storage.getToken('token');
            show_alert('Cargando', 'Cargando campañas', 'info');
      
            const response = await fetch("http://localhost:8000/api/campañas/all-campañas", {
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
            console.log(data.campañas);
            setCampañas(data.campañas);
          } catch (error) {
            console.error('Error:', error.message);
           
          } finally {
           
          }
        };
      
        fetchData();
      }, []);

    const handleImprimir = () => {
        GenerarpdfTablas.getpdfdeTabla('#tableCampaña',
            'LISTADO DE CAMPAÑAS  CENTRO COMERCIAL', logo);


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


    return (
        <section className="background-radial-gradient overflow-lg-hidden vh-100">
            <div className="container text-center pt-5">
                <h2 className="tituloTabla text-center mb-4">LISTADO DE CAMPAÑAS  CENTRO COMERCIAL</h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto', paddingTop: '40px' }}>
                    <table id="tableCampaña" className="table table-bordered table-alternate">
                        <thead>
                            <tr>
                                <th scope="col">CODIGO CAMAPAÑA</th>
                                <th scope="col">DESCRIPCION</th>
                                <th scope="col">FECHA INICIO</th>
                                <th scope="col">FECHA FIN</th>
                                <th scope="col">ESTADO</th>                               
                                
                            </tr>
                        </thead>
                        <tbody>
                            {campañas.map((campaña,index) => (
                                <tr key={campaña.id}>
                                    <td>{campaña.id}</td>
                                    <td>{campaña.nombre}</td>
                                    <td>{formatfecha(campaña.fecha_inicio)}</td>
                                    <td>{formatfecha(campaña.fecha_caducidad)}</td>
                                    <td>{campaña.estado == 1 ? 'ACTIVA':'DESACTIVA'}</td>
                                </tr>
                            )) }
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
