import React from 'react';
import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';

import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';



export const ConsultarProfesiones = () => {

    const handleImprimir = () => {
        GenerarpdfTablas.getpdfdeTabla('#tableProfesiones',
            'LISTADO DE PROFESIONES', logo);


    };

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
                            <tr>
                                <td>1</td>
                                <td>Abogado</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Administrador de empresas</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Ingeniero de sistemas</td>
                            </tr>

                            <tr>
                                <td>4</td>
                                <td>Medico</td>
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
