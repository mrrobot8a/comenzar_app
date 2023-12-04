import React from 'react';
import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';

import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';



export const ConsultarCampañas = () => {

    const handleImprimir = () => {
        GenerarpdfTablas.getpdfdeTabla('#tableCampaña',
            'LISTADO DE CAMPAÑAS  CENTRO COMERCIAL', logo);


    };

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
                            <tr>
                                <td>002-f</td>
                                <td>ARRANCAR SOBRE RUEDAS</td>
                                <td>10/10/2021</td>
                                <td>10/11/2021</td>
                                <td>Activa</td>
                            </tr>
                            <tr>
                                <td>003-r</td>
                                <td>NAVIDAD EN FAMILIAo</td>
                                <td>10/10/2021</td>
                                <td>10/12/2021</td>
                                <td>Activa</td>
                            </tr>
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
