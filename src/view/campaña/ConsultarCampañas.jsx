import React, { useState, useEffect, useRef } from "react";
import { Storage } from "../../Storage/Storage";
import { show_alert, hide_alert } from "../../components/customHooks/Alerts";

import logo from "../../components/img/Unicentro-Valledupar-logo-512-lined.png";

import { GenerarpdfTablas } from "../../components/pdf/GenerarpdfTablas";

import { CustomInput } from "../../components/global/CustomInput";

export const ConsultarCampañas = () => {
  const [campanas, setCampanas] = useState([]);

  const nombre_campana = useRef();
  const codigo_campana = useRef();
  let value = "";

  const API_URL = "http://localhost:8000/api";

  async function handleBuscarCampana(e) {
    e.preventDefault();

    value = codigo_campana.current.value || nombre_campana.current.value;

    // if (value === "") {
    //   show_alert(
    //     "Error",
    //     "Por favor ingrese el codigo ó la descripción de la campaña",
    //     "error"
    //   );
    //   return;
    // }

    const campana = {
      id: codigo_campana.current.value,
      nombre: nombre_campana.current.value,
    };

    const token = Storage.getToken("token");
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campana),
    };
    show_alert("Buscando", "Buscando Campaña", "info");
    await fetch(`${API_URL}/campanas/search-campanas/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCampanas(data.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Storage.getToken("token");
        show_alert("Cargando", "Cargando campañas", "info");

        const response = await fetch(`${API_URL}/campanas/all-campanas/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        hide_alert();

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        setCampanas(data.campañas);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
      }
    };

    fetchData();
  }, []);

  const handleImprimir = () => {
    GenerarpdfTablas.getpdfdeTabla(
      "#tableCampaña",
      "LISTADO DE CAMPAÑAS  CENTRO COMERCIAL",
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

  return (
    <section className="background-radial-gradient overflow-lg-hidden vh-100">
      <div>
        <div className="row  m-1">
          <h2 className="tituloTabla text-center mb-4 mt-2">
            CONSULTAR CAMPAÑAS
          </h2>

          <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-2 mb-4">
            <div
              className="card bg-glass custom-form mt-5"
              style={{ borderRadius: "26px" }}
            >
              <div className="card-body px-4 py-4 px-md-5">
                <h1 style={{ textAlign: "center" }}>Datos de la campaña</h1>
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
                              Codigo de la campaña
                            </label>
                            <CustomInput
                              idInput={"text"}
                              elementReferenced={codigo_campana}
                            />
                          </div>
                        </div>

                        <div className="col-md-7 mb-7">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              Nombre de la campaña
                            </label>
                            <CustomInput
                              type="text"
                              elementReferenced={nombre_campana}
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
                            onClick={handleBuscarCampana}
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
              LISTADO DE CAMPAÑAS
            </h2>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                paddingTop: "40px",
              }}
            >
              <table
                id="tableCampaña"
                className="table table-bordered table-alternate"
              >
                <thead>
                  <tr>
                    <th scope="col">CODIGO CAMPAÑA</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">FECHA INICIO</th>
                    <th scope="col">FECHA FIN</th>
                    <th scope="col">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {campanas &&
                    campanas.map((campana, index) => (
                      <tr key={campanas.id}>
                        <td>{campana.id}</td>
                        <td>{campana.nombre}</td>
                        <td>{formatfecha(campana.fecha_inicio)}</td>
                        <td>{formatfecha(campana.fecha_caducidad)}</td>
                        <td>{campana.estado === 1 ? "ACTIVO" : "DESACTIVO"}</td>
                      </tr>
                    ))}

                  {campanas.length <= 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No existen campañas
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
