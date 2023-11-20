import React, { useState } from 'react';

export const CustomSelect = ({ options , onOtroProfesionChange }) => {
    
    const [selectedValue, setSelectedValue] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleProfessionChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedValue(selectedOption);
        setShowOtherInput(selectedOption === 'Otraprofesion');
    };

    // const handleOtroProfesionChangeLocal = (e) => {
    //     const value = e.target.value;
    //     // setOtroProfesionValue(value);
    //     // Llama a la función de devolución de llamada del componente padre
    //     onOtroProfesionChange(value);
    //   };

    return (
        <>
            <select
                value={selectedValue}
                className="form-select"
                onChange={handleProfessionChange}
            >
                {options.map((option,index) => (
                    <option key={index+1} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {showOtherInput && (
                <input type="text" id="otroprofesion" className="form-control" onChange={onOtroProfesionChange}/>
            )}
        </>
    );
};
