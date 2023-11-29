import { useRef } from "react";

export const Alerts = () => {

    const alertRef = useRef();

    function showAlertSuccess(data)
    {
        alertRef.current.classList.remove('d-none', 'alert-danger');
        alertRef.current.classList.add('alert-info', 'd-block');
        alertRef.current.textContent = data.message;

        setTimeout(() => {
            alertRef.current.classList.add('d-none');
        }, 3000);
    }

    function showAlertDanger(data)
    {
        alertRef.current.classList.remove('d-none', 'alert-info');
        alertRef.current.classList.add('alert-danger');
        alertRef.current.textContent = data.message;
        setTimeout(() => {
            alertRef.current.classList.add('d-none');
        }, 3000);
    }

   return {
       alertRef,
       showAlertSuccess,
       showAlertDanger
   }
}