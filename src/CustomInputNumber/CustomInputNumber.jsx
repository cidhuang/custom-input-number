import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";

import "./CustomInputNumber.scss"

import { setFocus, setDown, setUp } from "./lib"

// react
import React, { useState, useRef } from 'react';

const CustomInputNumber = ({
    min,
    max,
    step,
    name = uuidv4(),
    value,
    disabled = false,
    onChange = (e) => { },
    onBlur = (e) => { }
}) => {
    const [content, setContent] = useState(value);
    const [mouseDownMinus, setMouseDownMinus] = useState(false);
    const [mouseDownPlus, setMouseDownPlus] = useState(false);
    const timeoutIdMinus = useRef(null);
    const timeoutIdPlus = useRef(null);

    function handleKeyUp(e) {
        switch (e.code) {
            case "ArrowUp":
            case "ArrowDown":
                if (parseFloat(content) != parseFloat(e.target.value)) {
                    onChange({ target: { name: name, value: e.target.value } });
                    setContent(e.target.value);
                }
                break;
            default:
                break;
        }
    }

    function handleChange(e) {
        onChange({ target: { name: name, value: e.target.value } });
        setContent(e.target.value);
    }

    function handleBlur(e) {
        if (mouseDownMinus) {
            setMouseDownMinus(false);
            setFocus(name);
            return;
        }
        if (mouseDownPlus) {
            setMouseDownPlus(false);
            setFocus(name);
            return;
        }
        if (onBlur) {
            onBlur(e);
        }
    }

    function down() {
        let r = setDown(name);
        if (r !== null) {
            onChange({ target: { name: name, value: r } });
            setContent(r);
        }
    }

    function up() {
        let r = setUp(name);
        if (r !== null) {
            onChange({ target: { name: name, value: r } });
            setContent(r);
        }
    }

    function handleTimeOutMinus() {
        timeoutIdMinus.current = window.setTimeout(handleTimeOutMinus, 50);
        down();
    }

    function handleTimeOutPlus() {
        timeoutIdPlus.current = window.setTimeout(handleTimeOutPlus, 50);
        up();
    }

    function handleMouseUpMinus(e) {
        setMouseDownMinus(false);
        window.clearTimeout(timeoutIdMinus.current);
        window.removeEventListener('mouseup', handleMouseUpMinus, true);
    }

    function handleMouseUpPlus(e) {
        setMouseDownPlus(false);
        window.clearTimeout(timeoutIdPlus.current);
        window.removeEventListener('mouseup', handleMouseUpPlus, true);
    }

    function handleMouseDownMinus(e) {
        if (disabled) {
            return;
        }
        window.addEventListener('mouseup', handleMouseUpMinus, true)
        timeoutIdMinus.current = window.setTimeout(handleTimeOutMinus, 500);
        down();
        setMouseDownMinus(true);
    }

    function handleMouseDownPlus(e) {
        if (disabled) {
            return;
        }
        window.addEventListener('mouseup', handleMouseUpPlus, true)
        timeoutIdPlus.current = window.setTimeout(handleTimeOutPlus, 500);
        up();
        setMouseDownPlus(true);
    }

    return (
        <div className="CustomInputNumberRoot" style={{ background: disabled ? '#dddddd' : 'white' }}>
            <div className="CustomInputNumberBtn"
                onMouseDown={e => handleMouseDownMinus(e)}
            >
                -
            </div>
            <input type="number" className="CustomInputNumberContent"
                min={min}
                max={max}
                step={step}
                name={name}
                value={content}
                disabled={disabled}
                onBlur={e => handleBlur(e)}
                onChange={e => handleChange(e)}
                onKeyUp={e => handleKeyUp(e)}
            />
            <div className="CustomInputNumberBtn"
                onMouseDown={e => handleMouseDownPlus(e)}
            >
                +
            </div>
        </div>
    );
};

CustomInputNumber.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

export default CustomInputNumber
