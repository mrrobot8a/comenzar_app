import { useRef } from "react";
import { Navigate } from "react-router-dom";

export const Login = ({setUserAuth, isAllowed, redirect}) => {

    const emailRef = useRef();
    const passwordRef = useRef();

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
                localStorage.setItem("token", data.authorization.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUserAuth(data.user)
            })
        
    }

    if(isAllowed) return <Navigate to={redirect}/>

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <form className="card bg-light w-50" onSubmit={handleSumibit}>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control text-muted" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailRef}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control text-muted" id="exampleInputPassword1" ref={passwordRef}/>
              </div>
              <button type="submit" className="btn btn-primary d-block w-100">Entrar</button>
            </div>
          </form>
        </div>
      );
    
};
    
