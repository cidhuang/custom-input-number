import CustomInputNumber from './CustomInputNumber/CustomInputNumber';
import Room from './Room/Room';
import RoomAllocation from './RoomAllocation/RoomAllocation';

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
            <div>
                <h3>RoomAllocation</h3>
            </div>
            <RoomAllocation
                guest={6}
                room={3}
                name="ma"
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
                min={value}
                max={31}
                step={2}
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