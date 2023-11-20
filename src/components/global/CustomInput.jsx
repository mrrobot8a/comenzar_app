import React, { useState, useEffect } from 'react';

export const CustomInput = ({ labelPlaceholder, idInput, type, value }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [mensajeError, setMensajeError] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Validación de los campos
  const handleChange = (event) => {
    const newInputValue = event.target.value;

    // Expresión regular para permitir solo letras, espacios y evitar ciertos símbolos
    const regexPattern =
      idInput === 'formDate'
        ? /^\d{2}-\d{2}-\d{4}$/
        : idInput === 'formEmail'
        ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{4}$/
        : idInput === 'formDireccion'
        ? /[^A-Za-zÑñÁáÉéÍíÓóÚú\s-#^0-9]/
        : type === 'text'
        ? /[^A-Za-zÑñÁáÉéÍíÓóÚú\s]/
        : /[^0-9]/;

    if (regexPattern.test(newInputValue)) {
      // Si se ingresan caracteres no permitidos, muestra mensaje de error
      setMensajeError(
        type === 'text' ? 'Por favor, ingrese solo letras y espacios.' : 'Por favor, ingrese solo números'
      );
      setTooltipVisible(true);
    } else {
      // Para otros tipos de input o valores válidos, actualizar el valor y ocultar el mensaje de error
      setMensajeError('');
      setInputValue(newInputValue);
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
        className="form-control"
        placeholder={labelPlaceholder}
        title="Ingrese solo caracteres de texto"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />
      {mensajeError && tooltipVisible && (
        <div className="tooltip fade bs-tooltip-bottom show" role="tooltip">
          <div className="tooltip-inner">{mensajeError}</div>
        </div>
      )}
    </>
  );
};
