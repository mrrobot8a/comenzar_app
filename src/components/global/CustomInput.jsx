import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';


export const CustomInput = ({ className,labelPlaceholder, idInput, type, value, elementReferenced ,disabled}) => {
  const [validCamposSoloTexto, setValueFieldInputText] = useState(value || '');
  const [mensajeError, setMensajeError] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setValueFieldInputText(value || '');

  }, [value]);
  

  // Agrega esta función para limpiar el campo
  const clearInputField = () => {
    setValueFieldInputText(value || '');
  };

  // Adjunta la función a la referencia
  useEffect(() => {
    if (elementReferenced && elementReferenced.current) {
      elementReferenced.current.clearInputField = clearInputField;
    }
  }, [elementReferenced,value]);

 

  // Validación de los campos
  const handleChange = (event) => {
    const inputValue = event.target.value;
  console.log(inputValue);
    // Expresión regular para permitir solo letras, espacios y evitar ciertos símbolos
    const regexPattern =
      idInput === 'formDate'
        ? /^\d{2}-\d{2}-\d{4}$/
         : idInput == "formNombreCampaña" ?
         /[^A-Za-zÑñÁáÉéÍíÓóÚú\s-#^0-9]/ 
        : idInput === 'formEmail'
        ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{4}$/
        : idInput === 'formDireccion'
        ? /[^A-Za-zÑñÁáÉéÍíÓóÚú\s-#^0-9]/
        : idInput === 'formContraseña'
        ? /[^A-Za-zÑñÁáÉéÍíÓóÚú\s-#^0-9]/
        : type === 'text'
        ? /[^A-Za-zÑñÁáÉéÍíÓóÚú\s]/        
        :/[^0-9]/ 
      

    

    if (regexPattern.test(inputValue)) {
      // Si se ingresan caracteres no permitidos, muestra mensaje de error
      setMensajeError(
        type === 'text' ? 'Por favor, ingrese solo letras y espacios.' : 'Por favor, ingrese solo números'
      );
      setTooltipVisible(true);
     
    } else {
      // Para otros tipos de input o valores válidos, actualizar el valor y ocultar el mensaje de error
      setMensajeError('');
      setValueFieldInputText(inputValue);
      setTooltipVisible(false);
    } 
  };

  

  const handleBlur = () => {
    setTooltipVisible(false);
   

  };

  const handleFocus = () => {
    setTooltipVisible(true);
   
  };

  return (
    <>
      <input
        type={type}
        id={idInput}
        className= {className?className:"form-control"}
        placeholder={labelPlaceholder}
        title="Ingrese solo caracteres de texto"
        value={validCamposSoloTexto}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={elementReferenced}
        // TODO: disabled no todos los inputs van hacer requeridos por favor modificar esto 
        disabled={disabled}
      />
      {mensajeError && tooltipVisible && (
        <div className="tooltip fade bs-tooltip-bottom show" role="tooltip">
          <div className="tooltip-inner">{mensajeError}</div>
        </div>
      )}
    </>
  );
};