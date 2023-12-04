import React from 'react';


import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';
import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';



export const ConsultarTiendas = () => {

  const handleImprimir = () => {
    GenerarpdfTablas.getpdfdeTabla('#tableTiendas',
        'LISTADO DE TIENDAS CENTRO COMERCIAL', logo);       


};

  return (
    <section className="background-radial-gradient overflow-lg-hidden vh-100">
      <div className="container text-center pt-5">
        <h2 className="tituloTabla text-center mb-4">FACTURAS DEL CLIENTE POR REDIMIR</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingTop: '40px' }}>
          <table id="tableTiendas" className="table table-bordered table-alternate">
            <thead>
              <tr>
                <th scope="col">CODIGO TIENDA</th>
                <th scope="col">DESCRIPCION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>002-f</td>
                <td>Calzado Bossi</td>
              </tr>
              <tr>
                <td>003-r</td>
                <td>Almacenes Exito</td>
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
