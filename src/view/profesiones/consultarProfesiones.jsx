import logo from "../../components/img/Unicentro-Valledupar-logo-512-lined.png";
import React, { useState, useEffect, useRef } from "react";
import { Storage } from "../../Storage/Storage";
import { hide_alert, show_alert } from "../../components/customHooks/Alerts";

import { GenerarpdfTablas } from "../../components/pdf/GenerarpdfTablas";
import { CustomInput } from "../../components/global/CustomInput";

export const ConsultarProfesiones = () => {
  const [profesiones, setProfesiones] = useState([]);
  const nombre_profesion = useRef();
  let value = "";
  const API_URL = "http://localhost:8000/api";

  async function handleBuscarProfesion(e) {
    e.preventDefault();

    value = nombre_profesion.current.value;

    const datos = {
      nombre_profesion: nombre_profesion.current.value,
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
    show_alert("Buscando", "Buscando Profesión", "info");
    await fetch(`${API_URL}/profesiones/search-profesiones/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProfesiones(data.data);
      })
      .catch((error) => console.log(error));
  }

  const handleImprimir = () => {
    GenerarpdfTablas.getpdfdeTabla(
      "#tableProfesiones",
      "LISTADO DE PROFESIONES",
      logo
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Storage.getToken("token");
        show_alert("Cargando", "Cargando Profesiones", "info");

        const response = await fetch(
          "http://localhost:8000/api/profesiones/all-profesiones",
          {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        hide_alert();

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        console.log(data.profesiones);
        setProfesiones(data.profesiones);
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
            CONSULTAR PROFESIONES
          </h2>

          <div className=" col-sm-12  col-lg-5 col-md-12 col-12 mb-5 mb-lg-0 mt-lg-3 mt-2 mb-4">
            <div
              className="card bg-glass custom-form mt-5"
              style={{ borderRadius: "26px" }}
            >
              <div className="card-body px-4 py-4 px-md-5">
                <h1 style={{ textAlign: "center" }}>Datos de la profesión</h1>
                <div>
                  {/* formulario  */}
                  <div className="form-row">
                    <div className="col-md-12 mb-1">
                      <div className="row">
                        <div className="col-md-12 mb-7">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              Profesión
                            </label>
                            <CustomInput
                              type="text"
                              elementReferenced={nombre_profesion}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="form-outline"></div>
                      </div>

                      <div className="row justify-space-around ">
                        <div className="col-12 col-sm-3  col-md-4 col-lg-6 d-flex justify-content-center">
                          <input
                            className="btn-consultar btn-lg mb-3"
                            type="button"
                            value="Consultar"
                            onClick={handleBuscarProfesion}
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
              LISTADO DE PROFESIONES
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
                    <th scope="col">No ITEM</th>
                    <th scope="col">DESCRIPCION</th>
                  </tr>
                </thead>
                <tbody>
                  {profesiones &&
                    profesiones.map((profesion, index) => (
                      <tr key={profesion.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{profesion.nombre_profesion}</td>
                      </tr>
                    ))}

                  {profesiones.length <= 0 && (
                    <tr>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        No existen profesiones
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
