import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { CustomInput } from "./global/CustomInput";

export const Login = ({ setUserAuth, isAllowed, redirect }) => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const alertRef = useRef();

  function handleSumibit(e) {

    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const credentials = {
      email,
      password
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(credentials),
    };

    fetch("http://localhost:8000/api/auth/login", requestOptions)
      .then((response) => response.json())
      .then(data => {
       
        if(data.success === false){
          alertRef.current.classList.remove("d-none");
          alertRef.current.classList.add("alert-danger");
          alertRef.current.innerText = data.message;
          return;
        }
        
        alertRef.current.classList.remove("d-none");
        alertRef.current.classList.add("alert-success");
        alertRef.current.innerText = data.message;
        localStorage.setItem("token", data.authorization.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUserAuth(data.user)
      })

  }

  if (isAllowed) return <Navigate to={redirect} />

  return (
    <section className="background-radial-gradient  d-flex align-items-center justify-content-center overflow-lg-hidden vh-100">
      <div className="container-fluid d-flex align-items-center justify-content-center overflow-auto">
        <div className="container_formulario_request justify-content-center mb-4 mt-4 mb-sm-O ">
          <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>
          <div className="container_formulario_text">
            <div className="text_info d-none d-lg-block">
              <h1 className="my-5 display-5 fw-bold ls-tight">
                CRM para Centros Comerciales <br />

              </h1>
              <p className="mb-4 opacity-70">
                {/* Texto opcional */}
              </p>
            </div>

            <div className="col-lg-6 col-12 mb-5 mb-lg-0 mt-lg-3 mt-4">
              <div id="radius-shape-1" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
              <div id="radius-shape-2" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
              <div className="alert alert-info d-none" role="alert" ref={alertRef}></div>

              <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                <div className="card-body px-4 py-4 px-md-5">
                  <h1 style={{ textAlign: 'center' }}>Iniciar Sesion</h1>
                  <form onSubmit={handleSumibit}>
                    {/* formulario  */}
                    <div className="form-row">
                      <div className="col-md-12 mb-4">

                        <div className="row">

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
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form3Example1">
                                Contraseña
                              </label>
                              <CustomInput
                                labelPlaceholder="********"
                                idInput="formContraseña"
                                type="password"
                                elementReferenced={passwordRef}

                              />
                            </div>
                          </div>
                        </div>


                        <div className="row justify-content-around my-2">
                          <div className="col-6 col-sm-6 d-flex justify-content-center">
                            <input className="btn-save btn-lg mb-2" type="submit" value="INICIAR " />
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
  );


};


