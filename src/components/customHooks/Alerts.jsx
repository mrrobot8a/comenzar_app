import { useRef } from "react";
import Swal from "sweetalert2";
import '../customHooks/Alerts.css';

import { httpRequests } from "../../http/httpRequets";

export const Alerts = () => {

    const alertRef = useRef();

    function showAlertSuccess(data) {
        alertRef.current.classList.remove('d-none', 'alert-danger');
        alertRef.current.classList.add('alert-info', 'd-block');
        alertRef.current.textContent = data.message;

        setTimeout(() => {
            alertRef.current.classList.add('d-none');
        }, 3000);
    }

    function showAlertDanger(data) {
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




export const show_alert = async (title, text, icon) => {
    const swalPromise = Swal.fire({
        title,
        text,
        icon,
        timer: 9999,
        timerProgressBar: true,
        toast: true,
        position: 'top',
        grow: 'row',
        showConfirmButton: false,
        customClass: {
            htmlContainer: 'custom-container'
        },
    });

    // Devolver la Promesa para que el código que llama a show_alert pueda esperarla
    return swalPromise;
};

export const hide_alert = () => {
    // Cerrar la alerta manualmente
    Swal.close();
};

export const show_confirm = (method, accion, url, redir, functions) => {

    const alert = Swal.mixin({ buttonsStyling: true });

    alert.fire({
        title: 'Estas seguro que quieres' + accion + '?',
        text: "Verifica los datos!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa-solid fa-check"></i> Yes, ' + accion + '!',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',

    }).then((result) => {
        if (result.isConfirmed) {
            httpRequests.sendRequest(method, {}, url, redir);
        }
    })
}
