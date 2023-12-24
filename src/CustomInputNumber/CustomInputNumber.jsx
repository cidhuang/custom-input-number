import "./CustomInputNumber.scss"

import { setFocus, setDown, setUp } from "./lib"

// react
import React, { useEffect, useState, useRef } from 'react';

const CustomInputNumber = (props) => {
    const [value, setValue] = useState(props.value);
    const [mouseDownMinus, setMouseDownMinus] = useState(false);
    const [mouseDownPlus, setMouseDownPlus] = useState(false);
    const timeoutIdMinus = useRef(null);
    const timeoutIdPlus = useRef(null);

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

    function down() {
        let r = setDown(props.name);
        if (r !== null) {
            props.onChange({ target: { name: props.name, value: r } });
            setValue(r);
        }
    }

    function up() {
        let r = setUp(props.name);
        if (r !== null) {
            props.onChange({ target: { name: props.name, value: r } });
            setValue(r);
        }
    }

    function onTimeOutMinus() {
        timeoutIdMinus.current = window.setTimeout(onTimeOutMinus, 50);
        down();
    }

    function onTimeOutPlus() {
        timeoutIdPlus.current = window.setTimeout(onTimeOutPlus, 50);
        up();
    }

    function onMouseUpMinus(e) {
        setMouseDownMinus(false);
        window.clearTimeout(timeoutIdMinus.current);
        window.removeEventListener('mouseup', onMouseUpMinus, true);
    }

    function onMouseUpPlus(e) {
        setMouseDownPlus(false);
        window.clearTimeout(timeoutIdPlus.current);
        window.removeEventListener('mouseup', onMouseUpPlus, true);
    }

    function onMouseDownMinus(e) {
        window.addEventListener('mouseup', onMouseUpMinus, true)
        timeoutIdMinus.current = window.setTimeout(onTimeOutMinus, 500);
        down();
        setMouseDownMinus(true);
    }

    function onMouseDownPlus(e) {
        window.addEventListener('mouseup', onMouseUpPlus, true)
        timeoutIdPlus.current = window.setTimeout(onTimeOutPlus, 500);
        up();
        setMouseDownPlus(true);
    }

    return (
        <div className="flex" >
            <div className="btn"
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
                onMouseDown={e => onMouseDownPlus(e)}
            >
                +
            </div>
        </div>
    );
};

export default CustomInputNumber
