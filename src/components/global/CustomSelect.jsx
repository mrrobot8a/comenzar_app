import React, { useState } from 'react';

export const CustomSelect = ({ options , onOtroProfesionChange, elementReferenced }) => {
    
    const [selectedValue, setSelectedValue] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleProfessionChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedValue(selectedOption);
        setShowOtherInput(selectedOption === 'Otraprofesion');
    };

    return (
        <>
            <select
                value={selectedValue}
                className="form-select"
                onChange={handleProfessionChange}
                ref={elementReferenced}
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
