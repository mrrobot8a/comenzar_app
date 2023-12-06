import logo from "../../components/img/Unicentro-Valledupar-logo-512-lined.png";
import React, { useState, useEffect, useRef } from "react";
import { Storage } from "../../Storage/Storage";
import { hide_alert, show_alert } from "../../components/customHooks/Alerts";

import { GenerarpdfTablas } from "../../components/pdf/GenerarpdfTablas";
import { CustomInput } from "../../components/global/CustomInput";

export const ConsultarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const numero_documento = useRef();
  const nombre = useRef();
  const apellidos = useRef();
  const telefono = useRef();

  const API_URL = "http://localhost:8000/api";

  async function handleBuscarClientes(e) {
    e.preventDefault();

    const datos = {
      numero_documento: numero_documento.current.value,
      nombre: nombre.current.value,
      apellidos: apellidos.current.value,
      telefono: telefono.current.value,
    };

    const token = Storage.getToken("token");
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    };
    show_alert("Buscando", "Buscando Clientes", "info");
    await fetch(`${API_URL}/clientes/searchCLientes/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setClientes(data.data);
      })
      .catch((error) => console.log(error));
  }

  const handleImprimir = () => {
    GenerarpdfTablas.getpdfdeTabla(
      "#tableProfesiones",
      "LISTADO DE CLIENTES",
      logo
    );
  };

  function formatfecha(fechaCompleta) {
    const fechaFormat = new Date(fechaCompleta);

    // Obtener componentes de fecha individualmente
    const año = fechaFormat.getFullYear();
    const mes = fechaFormat.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
    const dia = fechaFormat.getDate();

    // Crear una cadena de fecha formateada
    const fechaFormateada = `${año}-${mes < 10 ? "0" : ""}${mes}-${
      dia < 10 ? "0" : ""
    }${dia}`;
    return fechaFormateada;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Storage.getToken("token");
        show_alert("Cargando", "Cargando Clientes", "info");

        const response = await fetch("http://localhost:8000/api/clientes/", {
          method: "GET",
          headers: {
            // 'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        hide_alert();

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        console.log(data.data);
        setClientes(data.data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <section className="background-radial-gradient overflow-lg-hidden vh-100">
      <div>
        <div className="row  m-1">
          <h2 className="tituloTabla text-center mb-4 mt-2">
            CONSULTAR CLIENTES
          </h2>

          <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-2 mb-4">
            <div
              className="card bg-glass custom-form mt-5"
              style={{ borderRadius: "26px" }}
            >
              <div className="card-body px-4 py-4 px-md-5">
                <h1 style={{ textAlign: "center" }}>Datos del cliente</h1>
                <div>
                  {/* formulario  */}
                  <div className="form-row">
                    <div className="col-md-12 mb-1">
                      <div className="row">
                        <div className="col-md-5 mb-5">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example2"
                            >
                              Documento
                            </label>
                            <CustomInput
                              idInput={"text"}
                              elementReferenced={numero_documento}
                            />
                          </div>
                        </div>

                        <div className="col-md-7 mb-7">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              Nombre
                            </label>
                            <CustomInput
                              type="text"
                              elementReferenced={nombre}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-5 mb-5">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              Apellidos
                            </label>
                            <CustomInput
                              type="text"
                              elementReferenced={apellidos}
                            />
                          </div>
                        </div>

                        <div className="col-md-7 mb-7">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              Telefono
                            </label>
                            <CustomInput
                              idInput={"text"}
                              elementReferenced={telefono}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-1">
                        <div className="form-outline"></div>
                      </div>

                      <div className="row justify-space-around ">
                        <div className="col-12 col-sm-3  col-md-4 col-lg-6 d-flex justify-content-center">
                          <input
                            className="btn-consultar btn-lg mb-3"
                            type="button"
                            value="Consultar"
                            onClick={handleBuscarClientes}
                          />
                        </div>

                        <div className="col-6 col-sm-3 col-lg-6 col-md-12 d-flex justify-content-center">
                          <input
                            className="btn-delete btn-lg mb-2"
                            type="button"
                            value="Imprimir"
                            onClick={handleImprimir}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-12 mb-5 mb-lg-0 mt-lg-1 mt-4 px-4">
            <h2 className="tituloTabla text-center mb-4">
              LISTADO DE CLIENTES
            </h2>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                paddingTop: "40px",
              }}
            >
              <table
                id="tableProfesiones"
                className="table table-bordered table-alternate"
              >
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">IDENTIFICACIÓN</th>
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
                  {clientes &&
                    clientes.map((clientes, index) => (
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

                  {clientes.length <= 0 && (
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        No existen clientes
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button className="btn btn-danger mt-5" onClick={handleImprimir}>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
