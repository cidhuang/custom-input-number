import CustomInputNumber from './CustomInputNumber/CustomInputNumber';

import React, { useEffect, useState, useRef } from 'react';

const App = () => {
    const [value, setValue] = useState(3);

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

    function onClick(e) {
        setValue(value + 1);
    }

    return (
        <>
            <CustomInputNumber
                min={value}
                max="11"
                step="2"
                name="cin"
                value={5}
                disabled={false}
                onChange={onChangeCIN}
                onBlur={onBlurCIN}
            />
            <div></div>
            <input type="number" name="test"
                min={value}
                max="11"
                step="2"
                defaultValue={5}
                onChange={onChangeTest}
                onBlur={onBlurTest}
            ></input>
            <button onClick={onClick}>test</button>
        </>
    );
};

export default App