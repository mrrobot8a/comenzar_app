import { useEffect } from "react";

export const Login = () => {

    function handleSumibit(e){
        e.preventDefault();

    }

    useEffect(() => {
        fetch('http://localhost:8000/api/auth/login')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }, [])


    return (
        <>
            <form className="card-body bg-light my-5" onSubmit={handleSumibit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" >Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}