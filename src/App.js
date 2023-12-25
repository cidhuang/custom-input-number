import CustomInputNumber from './CustomInputNumber/CustomInputNumber';
import Room from './Room/Room';
import RoomAllocation from './RoomAllocation/RoomAllocation';

import React, { useEffect, useState, useRef } from 'react';

const App = () => {
    const [min, setMin] = useState(3);
    const [max, setMax] = useState(33);
    const [step, setStep] = useState(2);
    const [name, setName] = useState("CIN");
    const [value, setValue] = useState(7);
    const [disabled, setDisabled] = useState(false);

    function onChangeCIN(e) {
        console.log("onChangedCIN a", e.target.value, e.target.name, e);
    }

    function onBlurCIN(e) {
        console.log("onBlurCIN", e);
    }

    function onChangeTest(e) {
        console.log("onChangeTest a", e.target.value, e.target.name, e);
    }

    function onBlurTest(e) {
        console.log("onBlurTest", e);
    }

    function handleChangeMin(e) {
        setMin(parseFloat(e.target.value));
    }

    function handleChangeMax(e) {
        setMax(parseFloat(e.target.value));
    }

    function handleChangeStep(e) {
        setStep(parseFloat(e.target.value));
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeValue(e) {
        setValue(parseFloat(e.target.value));
    }

    function handleChangeDisabled(e) {
        setDisabled(e.target.checked);
    }

    return (
        <>
            <div>
                <h3>RoomAllocation</h3>
            </div>
            <RoomAllocation
                guest={6}
                room={3}
                onChange={result => console.log(result)} />
            <hr />
            <div>
                <h3>Room</h3>
            </div>
            <Room
                disabled={false}
            />
            <hr />
            <div>
                <h3>CustomInputNumber</h3>
            </div>
            <CustomInputNumber
                min={min}
                max={max}
                step={step}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChangeCIN}
                onBlur={onBlurCIN}
            />
            <div></div>
            <input type="number" name="test"
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                onChange={onChangeTest}
                onBlur={onBlurTest}
            />
            <div></div>
            <div>
                min
                <input type="number"
                    value={min}
                    onChange={handleChangeMin}
                />
            </div>
            <div>
                max
                <input type="number"
                    value={max}
                    onChange={handleChangeMax}
                />
            </div>
            <div>
                step
                <input type="number"
                    value={step}
                    onChange={handleChangeStep}
                />
            </div>
            <div>
                name
                <input type="text"
                    value={name}
                    onChange={handleChangeName}
                />
            </div>
            <div>
                value
                <input type="number"
                    value={value}
                    onChange={handleChangeValue}
                />
            </div>
            <div>
                disabled
                <input type="checkbox"
                    value={disabled}
                    onChange={handleChangeDisabled}
                />
            </div>
        </>
    );
};

export default App