import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Exito', 'Firsby', 'Bossi', 'Mr Wok', 'McDonalds'],
  datasets: [
    {
      data: [25, 7, 1, 12, 9],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
    },
  ],
};

export const TiendaEstadistica = () => {
  return (
    <div className="text-center">
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered table-hover mx-5">
          <thead>
            <tr>
              <th>Tienda</th>
              <th>Valor Facturas</th>
              <th>Participación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exito</td>
              <td>$25.000.000,00</td>
              <td>46%</td>
            </tr>
            <tr>
              <td>Firsby</td>
              <td>$7.000.000,00</td>
              <td>13%</td>
            </tr>
            <tr>
              <td>Bossi</td>
              <td>$1.000.000,00</td>
              <td>2%</td>
            </tr>
            <tr>
              <td>Mr Wok</td>
              <td>$12.000.000,00</td>
              <td>22%</td>
            </tr>
            <tr>
              <td>McDonalds</td>
              <td>$9.000.000,00</td>
              <td>17%</td>
            </tr>
          </tbody>
        </table>
        <div className="d-inline-block">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};


