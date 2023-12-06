import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';



// Asigna la base de la URL a una variable global llamada 'baseUrl'
window.baseUrl = 'http://localhost:8000/api';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     
        <App />
      
  </React.StrictMode>
);

