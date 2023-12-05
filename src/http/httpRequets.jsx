import { Storage } from "../Storage/Storage";
import { show_alert, show_confirm } from "../components/customHooks/Alerts";

export const httpRequests = {

    async sendRequest(method, params, url, redir = '', token = true, headers = '', data) {

        //Validamos si se necesita un token para enviar la solicitud
        if (token) {
            const token = Storage.getToken('token');
            if (!token) {
                show_alert('No se ha iniciado sesión', 'Por favor inicie sesión para continuar', 'error');
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)
            }
        }

        let res;



        await fetch(url, {
            method: method,
            headers: headers ? headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(async (response) => {
            res = await response.json();
            
            if (res.success && redir !== '') {
                show_alert(res.message, 'Bienvenido', 'success');
                setTimeout(() => {
                    window.location.href = redir;
                }, 2000);
            }else{
                
                show_alert(res.message, 'Error', 'error');
            }

        }).catch((errors) => {
            
        });



        console.log("respuesta", res);
        return res;



        // await axios({ method: method, url: url, data: params/*,headers: headers*/ }).then(
        //     response =>
        // )
        // const response = await fetch(url, requestOptions);
        // const dataResponse = await response.json();
    }



}