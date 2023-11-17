
export const ClienteView = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de manejo del formulario
        console.log("Formulario enviado");
    };

    const handleProfessionChange = (e) => {
        const inputField = document.getElementById('otroprofesion');
        inputField.style.display = e.target.value === 'Otraprofesion' ? 'block' : 'none';
    };

    const handlePetTypeChange = (e) => {
        const inputField = document.getElementById('otroTipo');
        inputField.style.display = e.target.value === 'Otro' ? 'block' : 'none';
    };

    const handleConsult = (e) => {
        e.preventDefault();
        // Lógica de manejo de la consulta
        console.log("Consulta realizada");
        // Aquí puedes agregar lógica adicional para manejar la consulta
    };

    return (
        <>
            <section className="background-radial-gradient overflow-hidden vh-100">
                <div className="container-fluid d-flex align-items-center justify-content-center"> {/* new contenido */}
                    <div className="container_formulario_request ">
                        <div className="container_formulario_text">

                            <div className="text_info d-none d-lg-block">
                                <h1 className="my-5 display-5 fw-bold ls-tight">
                                    CRM para Centros Comerciales <br />
                                    <span style={{ color: 'hsl(218, 81%, 75%)' }}>Para Registrar tus Compras</span>
                                </h1>
                                <p className="mb-4 opacity-70">
                                    {/* Texto opcional */}
                                </p>
                            </div>

                            <div className="col-lg-6 mb-5 mb-lg-0 mt-lg-3 mt-4">
                                <div id="radius-shape-1" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-8-strong d-none d-lg-block"></div>
                                <div className="card bg-glass custom-form mt-5" style={{ borderRadius: '26px' }}>
                                    <div className="card-body px-4 py-4 px-md-5">
                                        <h1 style={{ textAlign: 'center' }}>Registro Cliente</h1>
                                        <form onSubmit={handleSubmit}>
                                            {/* formulario  */}
                                            <div className="form-row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form3Example6">Nombre Cliente</label>
                                                        <input type="password" id="form3Example6" className="form-control" placeholder="Name" />

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">Teléfono</label>
                                                                <input type="text" id="form3Example1" className="form-control" placeholder="# Celular" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example2">Dirección</label>
                                                                <input type="text" id="form3Example2" className="form-control" placeholder="Calle #" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example1">Numero de hijos</label>
                                                                <input type="text" id="form3Example1" className="form-control" placeholder="N°xxx|" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example2">Numero de mascotas</label>
                                                                <input type="text" id="form3Example2" className="form-control" placeholder="N°xxx" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example3">Fecha Nacimiento</label>
                                                                <input type="date" id="form3Example3" className="form-control" />

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="form3Example4">Profesión</label>
                                                                <select
                                                                    id="form3Example4"
                                                                    className="form-control"
                                                                    onChange={handleProfessionChange}
                                                                >

                                                                    <option value="Estudiante">Estudiante</option>
                                                                    <option value="Empleado">Empleado</option>
                                                                    <option value="Desempleado">Desempleado</option>
                                                                    <option value="Profesional">Profesional</option>
                                                                    <option value="Tecnico">Técnico</option>
                                                                    <option value="Otraprofesion">Otro</option>
                                                                </select>
                                                                <input type="text" id="otroprofesion" className="form-control" style={{ display: 'none' }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <input type="email" id="form3Example5" className="form-control" placeholder="Correo" />
                                                        <label className="form-label" htmlFor="form3Example5">Dirección de correo electrónico</label>
                                                    </div>

                                                    <div className="containerbtnIniciar">
                                                        <input type="submit" value="Registrar" />
                                                        <input type="submit" value="Consultar" onClick={handleConsult} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* formulario end  */}
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