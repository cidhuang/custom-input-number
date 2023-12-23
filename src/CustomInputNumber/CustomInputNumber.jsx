import "./CustomInputNumber.scss"

import {setDown, setUp} from "./lib"

// react
import React, { useEffect, useState, useRef } from 'react';

const CustomInputNumber = (props) => {
    const inputRef = useRef(null);
    const [value, setValue] = useState(props.value);

    function onChange(e) {
        setValue(e.target.value);
        props.onChange(e);
    }

    function onClickMinus(e) {
        let v0 = structuredClone(inputRef.current.value);
        inputRef.current.focus();
        setDown(props.name);
        let v1 = structuredClone(inputRef.current.value);
        if(v0 !== v1) {
            props.onChange({target: inputRef.current});
        }
    }

    function onClickPlus(e) {
        let v0 = structuredClone(inputRef.current.value);
        inputRef.current.focus();
        setUp(props.name);
        let v1 = structuredClone(inputRef.current.value);
        if(v0 !== v1) {
            props.onChange({target: inputRef.current});
        }
     }

    return (
        <div className="flex" >
            <div className="btn" onClick={e => onClickMinus(e)}>
                -
            </div>
            <input type="number" className="content"
                ref={inputRef}
                min={props.min}
                max={props.max}
                step={props.step}
                name={props.name}
                value={value}
                disabled={props.disabled}
                onChange={e => onChange(e)}
                onBlur={props.onBlur}
            />
            <div className="btn" onClick={e => onClickPlus(e)}>
                +
            </div>
        </div>
    );
};

export default CustomInputNumber
