
import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import { httpRequests } from '../../http/httpRequets';
import { Storage } from '../../Storage/Storage';
import {show_alert,hide_alert} from '../../components/customHooks/Alerts';


import { GenerarpdfTablas } from '../../components/pdf/GenerarpdfTablas';
import logo from '../../components/img/Unicentro-Valledupar-logo-512-lined.png';



export const ConsultarTiendas = () => {

  const [tiendas, setTiendas] = useState([]);




  const alertRef = useRef();
  const nombre_tienda = useRef();
  const codigo_tienda = useRef();
  let value = '';


  async function handleBuscarTienda(e) {
    e.preventDefault();

    value = codigo_tienda.current.value || nombre_tienda.current.value;

    if(value === ''){
      show_alert('Error', 'Por favor ingrese el codigo o el nombre de la tienda', 'error');
      return;
    }


    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    };
    show_alert('Buscando', 'Buscando tienda', 'info');
    await fetch(`http://localhost:8000/api/tiendas/show/${value}`, requestOptions)
      .then((response) => response.json())
      .then(data => {
        console.log(data);
        setTiendas(data.tienda);

      }).catch(error => console.log(error));


  }



   









  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Storage.getToken('token');
        show_alert('Cargando', 'Cargando tiendas', 'info');
  
        const response = await fetch("http://localhost:8000/api/tiendas/all-tiendas", {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
  
        const data = await response.json();
        console.log(data.tiendas);
        setTiendas(data.tiendas);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        hide_alert();
      }
    };
  
    fetchData();
  }, []);
  




  const handleImprimir = () => {
    GenerarpdfTablas.getpdfdeTabla('#tableTiendas',
      'LISTADO DE TIENDAS CENTRO COMERCIAL', logo);


  };

  return (
    <section className="background-radial-gradient overflow-lg-hidden vh-100">
      <div className=" ">
        <div className="row  m-1">
          <h2 className="tituloTabla text-center mb-4 mt-0">Consultar tiendas</h2>


          <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-2 mb-4">

            <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>

              <div className="card-body px-4 py-4 px-md-5">
                <h1 style={{ textAlign: 'center' }}>Datos de la tienda</h1>
                <div>
                  {/* formulario  */}
                  <div className="form-row">
                    <div className="col-md-12 mb-4">

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form3Example2">
                              Codigo de la tienda
                            </label>
                            <CustomInput idInput={'formDireccion'} elementReferenced={codigo_tienda} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form3Example1">
                              Nombre de la tienda
                            </label>
                            <CustomInput type="text" elementReferenced={nombre_tienda} />
                          </div>
                        </div>

                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">

                        </div>
                      </div>
                      <div className="row justify-space-around ">
                        <div className="col-12 col-sm-3  col-md-4 col-lg-6 d-flex justify-content-center">
                          <input className="btn-consultar btn-lg mb-3" type="button" value="Consultar" onClick={handleBuscarTienda} />
                        </div>




                        <div className="col-6 col-sm-3 col-lg-6 col-md-12 d-flex justify-content-center">
                          <input className="btn-delete btn-lg mb-2" type="button" value="Imprimir" onClick={handleImprimir} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-12 mb-5 mb-lg-0 mt-lg-1 mt-4 px-4">
            <h2 className="tituloTabla text-center mb-2">Lista de tiendas</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingTop: '20px' }}>
              <table id="tableTiendas" className="table table-bordered table-alternate">
                <thead>
                  <tr>
                    <th scope="col">CODIGO TIENDA</th>
                    <th scope="col">DESCRIPCION</th>
                  </tr>
                </thead>
                <tbody>
                  {tiendas.map((tienda) => (
                    <tr key={tienda.id}>
                      <td>{tienda.id}</td>
                      <td>{tienda.nombre}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
