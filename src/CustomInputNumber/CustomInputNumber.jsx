import "./CustomInputNumber.scss"

import { setFocus, setDown, setUp } from "./lib"

// react
import React, { useEffect, useState, useRef } from 'react';

const CustomInputNumber = (props) => {
    const [value, setValue] = useState(props.value);
    const [mouseDownMinus, setMouseDownMinus] = useState(false);
    const [mouseDownPlus, setMouseDownPlus] = useState(false);

    function onKeyUp(e) {
        switch (e.code) {
            case "ArrowUp":
            case "ArrowDown":
                if (parseFloat(value) != parseFloat(e.target.value)) {
                    props.onChange({ target: { name: props.name, value: e.target.value } });
                    setValue(e.target.value);
                }
                break;
            default:
                break;
        }
    }

    function onChange(e) {
        props.onChange({ target: { name: props.name, value: e.target.value } });
        setValue(e.target.value);
    }

    function onBlur(e) {
        if (mouseDownMinus) {
            setMouseDownMinus(false);
            setFocus(props.name);
            return;
        }
        if (mouseDownPlus) {
            setMouseDownPlus(false);
            setFocus(props.name);
            return;
        }
        props.onBlur(e);
    }

    function onMouseDownMinus(e) {
        let r = setDown(props.name);
        if (r !== null) {
            props.onChange({ target: { name: props.name, value: r } });
            setValue(r);
        }
        setMouseDownMinus(true);
    }

    function onMouseDownPlus(e) {
        let r = setUp(props.name);
        if (r !== null) {
            props.onChange({ target: { name: props.name, value: r } });
            setValue(r);
        }
        setMouseDownPlus(true);
    }

    function onClickMinus(e) {
        setMouseDownMinus(false);
    }

    function onClickPlus(e) {
        setMouseDownPlus(false);
    }

    return (
        <div className="flex" >
            <div className="btn"
                onClick={e => onClickMinus(e)}
                onMouseDown={e => onMouseDownMinus(e)}
            >
                -
            </div>
            <input type="number" className="content"
                min={props.min}
                max={props.max}
                step={props.step}
                name={props.name}
                value={value}
                disabled={props.disabled}
                onBlur={e => onBlur(e)}
                onChange={e => onChange(e)}
                onKeyUp={e => onKeyUp(e)}
            />
            <div className="btn"
                onClick={e => onClickPlus(e)}
                onMouseDown={e => onMouseDownPlus(e)}
            >
                +
            </div>
        </div>
    );
};

export default CustomInputNumber
