import React, { useState, useEffect, useRef } from 'react';
import { CustomInput } from '../../components/global/CustomInput';
import { CustomSelect } from '../../components/global/CustomSelect';
import '../../components/cliente/css/cssClienteview.css';

export const ClienteView = () => {

  const [profesiones, setProfesiones] = useState([]);
  const [tiposDocumentos, setTipoDocumentos] = useState([]);
  const profesionRef = useRef();
  const tipoDocumentoRef = useRef();
  const nombreRef = useRef();
  const apellidoRef = useRef();
  const emailRef = useRef();
  const telefonoRef = useRef();
  const direccionRef = useRef();
  const fechaNacimientoRef = useRef();
  const hijosRef = useRef();
  const numeroDocumentoRef = useRef();
  const mascotasRef = useRef();
  const alertRef = useRef();

  function handleSubmit(e) {

    e.preventDefault();

    const cliente = {
      profesion_id: profesionRef.current.value,
      tipo_documento_id: tipoDocumentoRef.current.value,
      nombre: nombreRef.current.value,
      apellidos: apellidoRef.current.value,
      email: emailRef.current.value,
      telefono: telefonoRef.current.value,
      direccion: direccionRef.current.value,
      fecha_nacimiento: fechaNacimientoRef.current.value,
      hijos: hijosRef.current.value,
      numero_documento: numeroDocumentoRef.current.value,
      mascotas: mascotasRef.current.value,
    }

    console.log(cliente)

  }


  useEffect(() => {

    fetch("http://localhost:8000/api/clientes/info", {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      })
      .then(res => res.json())
      .then(data => {

        const profesiones = data.profesiones.map(profesion => {
          return {
            value: profesion.id,
            label: profesion.nombre_profesion
          }
        })

        const documentos = data.tipoDocumentos.map(tipoDocumento => {
          return {
            value: tipoDocumento.id,
            label: tipoDocumento.nombre_tipo_documento
          }
        })

        setProfesiones(profesiones);

        setTipoDocumentos(documentos);
        
  });


  }, [])


  return (
    <>
      <section className="background-radial-gradient overflow-lg-hidden vh-150">
        <div className="container-fluid d-flex align-items-center justify-content-center overflow-auto">
          <div className="container_formulario_request mb-4 mb-sm-O ">
            <div className="container_formulario_text">
              <div className="col-lg-6 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4">
                <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                  <div className="card-body px-4 py-4 px-md-5">
                    <h1 style={{ textAlign: 'center' }}>Registro Cliente</h1>
                    <form onSubmit={handleSubmit}>
                      {/* formulario  */}
                      <div className="form-row">
                        <div className="col-md-12 mb-4">
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">
                                  Nombres completo
                                </label>
                                <CustomInput
                                  labelPlaceholder="Nombre cliente"
                                  idInput="formNombre"
                                  type="text"
                                  elementReferenced={nombreRef}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example2">
                                  Apellidos completo
                                </label>
                                <CustomInput
                                  labelPlaceholder="apellido cliente"
                                  idInput="formApellido"
                                  type="text"
                                  elementReferenced={apellidoRef}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-group">
                                <label className="form-label" htmlFor="form3Example4">
                                  Tipo de documento
                                </label>
                                <CustomSelect 
                                  options={tiposDocumentos}
                                  elementReferenced={tipoDocumentoRef}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example3">
                                  Numero de documento
                                </label>
                                <CustomInput 
                                    labelPlaceholder="N° 1231282" 
                                    idInput="formCelular"
                                    type="tel" 
                                    elementReferenced={numeroDocumentoRef}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">
                                  Teléfono
                                </label>
                                <CustomInput 
                                  labelPlaceholder="# Celular" 
                                  idInput="formCelular" 
                                  type="tel" 
                                  elementReferenced={telefonoRef}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">
                                  Correo electronico
                                </label>
                                <CustomInput 
                                  labelPlaceholder="example@example.com" 
                                  idInput="formEmail" 
                                  type="email"
                                  elementReferenced={emailRef}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form3Example2">
                                Dirección
                              </label>
                              <CustomInput 
                                labelPlaceholder="example av.33 #23-34" 
                                idInput="formDireccion" 
                                type="text" 
                                elementReferenced={direccionRef}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">
                                  Numero de hijos
                                </label>
                                <CustomInput 
                                  labelPlaceholder="N°999" 
                                  idInput="formHijos" 
                                  type="tel" 
                                  elementReferenced={hijosRef}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example2">
                                  Numero de mascotas
                                </label>
                                <CustomInput 
                                  labelPlaceholder="N°999" 
                                  idInput="formMascotas" 
                                  type="tel" 
                                  elementReferenced={mascotasRef}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example3">
                                  Fecha Nacimiento
                                </label>
                                <CustomInput 
                                  idInput="formDate" 
                                  type="date" 
                                  elementReferenced={fechaNacimientoRef}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-group">
                                <label className="form-label" htmlFor="form3Example4">
                                  Profesión
                                </label>
                                <CustomSelect 
                                  options={profesiones} 
                                  elementReferenced={profesionRef}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-around my-2">
                            <div className="col-12 col-sm-3 d-flex justify-content-center">
                              <input className="btn btn-success btn-lg mb-2" type="submit" value="Registrar" />
                            </div>
                            <div className="col-12 col-sm-3 d-flex justify-content-center">
                              <input className="btn btn-danger btn-lg mb-2" type="button" value="Eliminar" />
                            </div>
                            <div className="col-12 col-sm-3 d-flex justify-content-center">
                              <input className="btn btn-primary btn-lg mb-2" type="button" value="Consultar"  />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
