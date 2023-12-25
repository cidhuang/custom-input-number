import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import CustomInputNumber from '../CustomInputNumber/CustomInputNumber';

import "./Room.scss"

// react
import React, { useEffect, useState } from 'react';

const Room = ({
    max = 4,
    name = uuidv4(),
    disabled = false,
    onChange = (e) => { }
}) => {
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);

    useEffect(() => {
        onChange({ name: name, adult: adult, child: child });
    }, [adult, child]);

    function handleChangeAdult(e) {
        setAdult(parseFloat(e.target.value));
    }

    function handleChangeChild(e) {
        setChild(parseFloat(e.target.value));
    }

    return (
        <div className="Room">
            <div className="RoomTitle">
                房間：{adult + child}人
            </div>
            <div className="RoomFlex">
                <div>
                    大人
                    <br />
                    年齡 20+
                </div>
                <CustomInputNumber
                    min={1}
                    max={max - child}
                    step={1}
                    name={name + "-adult"}
                    value={adult}
                    disabled={disabled}
                    onChange={handleChangeAdult}
                />
            </div>
            <div></div>
            <div className="RoomFlex">
                <div>
                    小孩
                </div>
                <CustomInputNumber
                    min={0}
                    max={max - adult}
                    step={1}
                    name={name + "-child"}
                    value={child}
                    disabled={disabled}
                    onChange={handleChangeChild}
                />
            </div>
        </div>
    );
};

Room.propTypes = {
    max: PropTypes.number,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Room
