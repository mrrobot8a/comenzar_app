import './csshome.css';

export const Home = () => {
    return (
       <>
         <section className="background-radial-gradient-d d-flex align-items-center justify-content-center overflow-lg-hidden ">
             <div className="container-fluid ">
                 <div className="container_formulario_request-d justify-content-center  ">
                     <div className="text_info d-none d-lg-block">
                         <h1 className="my-5 display-7 fw-bold ls-tight">
                             CRM para Centros Comerciales <br />
                         </h1>
                         <p className="mb-4 opacity-70">
                             {/* Texto opcional */}
                         </p>
                     </div>
                 </div>
             </div>
         </section>
       </>
    )
 }