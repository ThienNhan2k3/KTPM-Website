import "./styles.css";
import { useState } from "react";
import removeIcon from "@assets/images/remove-icon.png";

export default function TypeInput({disabled=false, intialTypes=[], placeholder="Type here"}) {
    const [types, setTypes] = useState(intialTypes);
    const [currentValue, setCurrentValue] = useState("");

    function handleKeyDown(event) {
        const key = event.key;
        if (key === 'Enter') {
            event.preventDefault();

            setTypes([
                ...types,
                currentValue
            ])
            setCurrentValue("");
        } else if (key === "Backspace" || key === "Delete") {
            setTypes(types.slice(0, types.length - 1))
        }
    }

    function handleRemoveType(type) {
        if (!disabled) {
            setTypes(types.filter(t => t != type));
        }
    }

    function handleInputChange(event) {
        setCurrentValue(event.target.value);
    }

    return (
        <div className="type-input-container d-flex flex-wrap align-items-center">
            <div className="type-list d-flex flex-wrap gap-1">
                {types.map(type => (
                    <div className="type-items d-flex gap-1 align-items-center btn rounded-pill">
                        {type}
                        <img src={removeIcon} onClick={() => handleRemoveType(type)}/>  
                    </div>
                ))}
            </div>
            <input 
                disabled={disabled}
                className="ps-2"
                type="text" 
                value={currentValue} 
                onKeyDown={(event) => handleKeyDown(event)} 
                onChange={(event) => handleInputChange(event)} 
                placeholder={!disabled ? placeholder : ""} />
        </div>
    )
}